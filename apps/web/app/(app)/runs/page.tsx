import { fetchJson } from '@/lib/api';

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
    <div>
      <h1>Runs</h1>
      <p>Ejecuciones de workflow desde el backend.</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {runs.map((run) => (
          <div
            key={run.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>{run.workflow.name}</h2>
            <p><strong>Status:</strong> {run.status}</p>
            <p><strong>Trigger:</strong> {run.triggerSource}</p>
            <p><strong>Organization:</strong> {run.workflow.organization.name}</p>
            <p><strong>ID:</strong> {run.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}