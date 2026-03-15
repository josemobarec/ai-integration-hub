import { fetchJson } from '@/lib/api';

type Organization = {
  id: string;
  name: string;
  slug: string;
};

export default async function OrganizationsPage() {
  const organizations = await fetchJson<Organization[]>('/organizations');

  return (
    <div>
      <h1>Organizations</h1>
      <p>Listado básico de organizaciones desde el backend.</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
        {organizations.map((organization) => (
          <div
            key={organization.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
            }}
          >
            <h2 style={{ margin: 0 }}>{organization.name}</h2>
            <p style={{ margin: '8px 0 0 0' }}>
              <strong>Slug:</strong> {organization.slug}
            </p>
            <p style={{ margin: '8px 0 0 0' }}>
              <strong>ID:</strong> {organization.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}