import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/organizations', label: 'Organizations' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/runs', label: 'Runs' },
  { href: '/approvals', label: 'Approvals' },
];

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
      }}
    >
      <aside
        style={{
          borderRight: '1px solid #e5e7eb',
          padding: 20,
          background: '#fafafa',
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 24 }}>
          AI Integration Hub
        </div>

        <nav style={{ display: 'grid', gap: 12 }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div>
        <header
          style={{
            height: 64,
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>Workspace</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              User ID: {userId}
            </div>
          </div>

          <UserButton />
        </header>

        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}