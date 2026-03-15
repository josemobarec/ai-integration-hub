import { fetchJson } from '@/lib/api';
import { getStatusBadgeClass } from '@/lib/ui';

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
    <div className="section-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Approvals</h1>
          <p className="page-subtitle">
            Flujo human-in-the-loop para decisiones críticas del sistema.
          </p>
        </div>
      </div>

      <div className="grid">
        {approvals.map((approval) => (
          <div key={approval.id} className="card">
            <div className="card-body">
              <h2 className="card-title">{approval.workflowRun.workflow.name}</h2>

              <div className={getStatusBadgeClass(approval.status)}>
                {approval.status}
              </div>

              <div className="meta-list">
                <div className="meta-row">
                  <strong>Reason:</strong> {approval.reason ?? '—'}
                </div>
                <div className="meta-row">
                  <strong>Decision:</strong> {approval.decisionNote ?? '—'}
                </div>
                <div className="meta-row">
                  <strong>Organization:</strong> {approval.workflowRun.workflow.organization.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}