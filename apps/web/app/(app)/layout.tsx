import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { NavLink } from '@/components/nav-link';

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
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-title">AI Integration Hub</div>
          <div className="brand-subtitle">B2B workflow orchestration</div>
        </div>

        <nav className="nav-section">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div>
            <div className="topbar-title">Workspace</div>
            <div className="topbar-meta">User ID: {userId}</div>
          </div>

          <UserButton />
        </header>

        <div className="page-wrap">
          <div className="page-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}