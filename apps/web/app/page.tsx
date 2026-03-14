import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>AI Integration Hub</h1>
      <p>Home pública del proyecto.</p>

      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <Link href="/dashboard">Ir al dashboard</Link>
        <Link href="/organizations">Organizations</Link>
      </div>
    </div>
  );
}