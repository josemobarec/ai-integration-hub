import { fetchJson } from '@/lib/api';

type Organization = { id: string };
type Integration = { id: string };
type Workflow = { id: string };
type Run = { id: string };
type Approval = { id: string };

export default async function DashboardPage() {
  const [organizations, integrations, workflows, runs, approvals] =
    await Promise.all([
      fetchJson<Organization[]>('/organizations'),
      fetchJson<Integration[]>('/integrations'),
      fetchJson<Workflow[]>('/workflows'),
      fetchJson<Run[]>('/runs'),
      fetchJson<Approval[]>('/approvals'),
    ]);

  const cards = [
    { label: 'Organizations', value: organizations.length },
    { label: 'Integrations', value: integrations.length },
    { label: 'Workflows', value: workflows.length },
    { label: 'Runs', value: runs.length },
    { label: 'Approvals', value: approvals.length },
  ];

  return (
    <div className="section-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Resumen operativo del sistema con datos reales del backend.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="card kpi-card">
            <div className="kpi-label">{card.label}</div>
            <div className="kpi-value">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Estado del proyecto</h2>
          <p className="card-subtle">
            Base técnica, auth, workflows, approvals, runs y auditoría ya
            conectados de extremo a extremo.
          </p>
        </div>
      </div>
    </div>
  );
}