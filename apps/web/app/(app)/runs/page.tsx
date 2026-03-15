import { fetchJson } from '@/lib/api';
import { getStatusBadgeClass } from '@/lib/ui';

type Run = {
  id: string;
  status: string;
  triggerSource: string;
  workflow: {
    name: string;
    organization: {
      name: string;
    };
  };
};

export default async function RunsPage() {
  const runs = await fetchJson<Run[]>('/runs');

  return (
    <div className="section-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Runs</h1>
          <p className="page-subtitle">
            Ejecuciones reales de workflows con estado y trazabilidad.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {runs.map((run) => (
          <div key={run.id} className="card">
            <div className="card-body">
              <h2 className="card-title">{run.workflow.name}</h2>

              <div className={getStatusBadgeClass(run.status)}>{run.status}</div>

              <div className="meta-list">
                <div className="meta-row">
                  <strong>Trigger:</strong> {run.triggerSource}
                </div>
                <div className="meta-row">
                  <strong>Organization:</strong> {run.workflow.organization.name}
                </div>
                <div className="meta-row">
                  <strong>ID:</strong> {run.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}