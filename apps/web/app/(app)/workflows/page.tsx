import { fetchJson } from '@/lib/api';
import { getStatusBadgeClass } from '@/lib/ui';

type Workflow = {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  organization: {
    name: string;
  };
  runs: { id: string }[];
};

export default async function WorkflowsPage() {
  const workflows = await fetchJson<Workflow[]>('/workflows');

  return (
    <div className="section-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Workflows</h1>
          <p className="page-subtitle">
            Flujos configurados para automatizar acciones del sistema.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="card">
            <div className="card-body">
              <h2 className="card-title">{workflow.name}</h2>

              <div className={getStatusBadgeClass(workflow.isActive ? 'ACTIVE' : 'INACTIVE')}>
                {workflow.isActive ? 'ACTIVE' : 'INACTIVE'}
              </div>

              <div className="meta-list">
                <div className="meta-row">
                  <strong>Type:</strong> {workflow.type}
                </div>
                <div className="meta-row">
                  <strong>Organization:</strong> {workflow.organization.name}
                </div>
                <div className="meta-row">
                  <strong>Runs:</strong> {workflow.runs.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}