import { fetchJson } from '@/lib/api';

type Integration = {
  id: string;
  provider: string;
  status: string;
  accountLabel: string | null;
  organization: {
    name: string;
    slug: string;
  };
};

export default async function IntegrationsPage() {
  const integrations = await fetchJson<Integration[]>('/integrations');

  return (
    <div>
      <h1>Integrations</h1>
      <p>Integraciones disponibles desde el backend.</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {integrations.map((integration) => (
          <div
            key={integration.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>{integration.provider}</h2>
            <p><strong>Status:</strong> {integration.status}</p>
            <p><strong>Account:</strong> {integration.accountLabel ?? '—'}</p>
            <p><strong>Organization:</strong> {integration.organization.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}