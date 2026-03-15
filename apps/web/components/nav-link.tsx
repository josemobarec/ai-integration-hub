'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  label: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
    >
      <span className="nav-link-label">{label}</span>
    </Link>
  );
}