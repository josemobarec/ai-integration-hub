import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ marginBottom: 12 }}>AI Integration Hub</h1>
      <p style={{ marginBottom: 24 }}>
        Hub B2B para conectar sistemas y automatizar workflows con agentes.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/dashboard">Ir al dashboard</Link>
        <Link href="/sign-in">Iniciar sesión</Link>
        <Link href="/sign-up">Crear cuenta</Link>
      </div>
    </div>
  );
}