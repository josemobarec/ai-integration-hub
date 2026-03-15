import { fetchJson } from '@/lib/api';

type Approval = {
  id: string;
  status: string;
  reason: string | null;
  decisionNote: string | null;
  workflowRun: {
    workflow: {
      name: string;
      organization: {
        name: string;
      };
    };
  };
};

export default async function ApprovalsPage() {
  const approvals = await fetchJson<Approval[]>('/approvals');

  return (
    <div>
      <h1>Approvals</h1>
      <p>Aprobaciones del flujo human-in-the-loop.</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {approvals.map((approval) => (
          <div
            key={approval.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>{approval.workflowRun.workflow.name}</h2>
            <p><strong>Status:</strong> {approval.status}</p>
            <p><strong>Reason:</strong> {approval.reason ?? '—'}</p>
            <p><strong>Decision:</strong> {approval.decisionNote ?? '—'}</p>
            <p><strong>Organization:</strong> {approval.workflowRun.workflow.organization.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}