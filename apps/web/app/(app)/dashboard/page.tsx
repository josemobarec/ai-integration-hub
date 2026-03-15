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
    <div>
      <h1 style={{ marginBottom: 8 }}>Dashboard</h1>
      <p style={{ marginBottom: 24 }}>
        Resumen básico del sistema conectado al backend real.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
              background: '#fff',
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.7 }}>{card.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}