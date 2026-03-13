import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  MembershipRole,
  ConnectionStatus,
  IntegrationProvider,
  WorkflowType,
  WorkflowRunStatus,
  ApprovalStatus,
} from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'owner@aihub.dev' },
    update: {},
    create: {
      email: 'owner@aihub.dev',
      name: 'Owner AI Hub',
    },
  });

  const organization = await prisma.organization.upsert({
    where: { slug: 'acme-ai' },
    update: {},
    create: {
      name: 'Acme AI',
      slug: 'acme-ai',
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: organization.id,
      },
    },
    update: {
      role: MembershipRole.OWNER,
    },
    create: {
      userId: user.id,
      organizationId: organization.id,
      role: MembershipRole.OWNER,
    },
  });

  const existingIntegrations = await prisma.integrationConnection.findMany({
    where: {
      organizationId: organization.id,
      provider: {
        in: [IntegrationProvider.GMAIL, IntegrationProvider.NOTION],
      },
    },
    select: {
      provider: true,
    },
  });

  const existingProviders = new Set(
    existingIntegrations.map((item) => item.provider),
  );

  const integrationsToCreate = [
    {
      organizationId: organization.id,
      provider: IntegrationProvider.GMAIL,
      status: ConnectionStatus.CONNECTED,
      accountLabel: 'support@acme-ai.com',
    },
    {
      organizationId: organization.id,
      provider: IntegrationProvider.NOTION,
      status: ConnectionStatus.CONNECTED,
      accountLabel: 'Acme Workspace',
    },
  ].filter((item) => !existingProviders.has(item.provider));

  if (integrationsToCreate.length > 0) {
    await prisma.integrationConnection.createMany({
      data: integrationsToCreate,
    });
  }

  const existingWorkflow = await prisma.workflow.findFirst({
    where: {
      organizationId: organization.id,
      name: 'Email Triage Workflow',
      type: WorkflowType.EMAIL_TRIAGE,
    },
  });

  const workflow =
    existingWorkflow ??
    (await prisma.workflow.create({
      data: {
        organizationId: organization.id,
        name: 'Email Triage Workflow',
        type: WorkflowType.EMAIL_TRIAGE,
        isActive: true,
        config: {
          autoCreateTicket: true,
          requireApprovalForHighPriority: true,
        },
      },
    }));

  const run = await prisma.workflowRun.create({
    data: {
      workflowId: workflow.id,
      status: WorkflowRunStatus.WAITING_APPROVAL,
      triggerSource: 'gmail',
      inputPayload: {
        subject: 'Urgent issue with invoice processing',
        from: 'client@company.com',
      },
      outputPayload: {
        summary: 'Client reports invoice processing issue.',
        priority: 'HIGH',
        suggestedAction: 'Create support ticket',
      },
      startedAt: new Date(),
    },
  });

  await prisma.approvalRequest.create({
    data: {
      workflowRunId: run.id,
      status: ApprovalStatus.PENDING,
      reason: 'High priority ticket creation requires approval.',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      workflowRunId: run.id,
      action: 'WORKFLOW_RUN_CREATED',
      entityType: 'WorkflowRun',
      entityId: run.id,
      metadata: {
        source: 'seed',
      },
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
