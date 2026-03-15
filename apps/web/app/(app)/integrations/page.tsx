import { fetchJson } from '@/lib/api';
import { getStatusBadgeClass } from '@/lib/ui';

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
    <div className="section-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Integrations</h1>
          <p className="page-subtitle">
            Conectores y estados disponibles desde el backend.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {integrations.map((integration) => (
          <div key={integration.id} className="card">
            <div className="card-body">
              <h2 className="card-title">{integration.provider}</h2>

              <div className={getStatusBadgeClass(integration.status)}>
                {integration.status}
              </div>

              <div className="meta-list">
                <div className="meta-row">
                  <strong>Account:</strong> {integration.accountLabel ?? '—'}
                </div>
                <div className="meta-row">
                  <strong>Organization:</strong> {integration.organization.name}
                </div>
                <div className="meta-row">
                  <strong>Slug:</strong> {integration.organization.slug}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}