import { fetchJson } from '@/lib/api';

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
    <div>
      <h1>Workflows</h1>
      <p>Workflows disponibles en el sistema.</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>{workflow.name}</h2>
            <p><strong>Type:</strong> {workflow.type}</p>
            <p><strong>Active:</strong> {workflow.isActive ? 'Yes' : 'No'}</p>
            <p><strong>Organization:</strong> {workflow.organization.name}</p>
            <p><strong>Runs:</strong> {workflow.runs.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}