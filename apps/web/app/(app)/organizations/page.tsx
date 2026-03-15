import { fetchJson } from '@/lib/api';

type Organization = {
  id: string;
  name: string;
  slug: string;
};

export default async function OrganizationsPage() {
  const organizations = await fetchJson<Organization[]>('/organizations');

  return (
    <div className="section-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Organizations</h1>
          <p className="page-subtitle">
            Gestión base de workspaces conectados al backend real.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {organizations.map((organization) => (
          <div key={organization.id} className="card">
            <div className="card-body">
              <h2 className="card-title">{organization.name}</h2>
              <div className="meta-list">
                <div className="meta-row">
                  <strong>Slug:</strong> {organization.slug}
                </div>
                <div className="meta-row">
                  <strong>ID:</strong> {organization.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}