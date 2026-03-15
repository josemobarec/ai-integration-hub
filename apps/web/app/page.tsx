import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="hero">
      <section className="hero-card">
        <div className="hero-badge">AI Integration Hub · Portfolio Project</div>

        <h1>Conecta sistemas y automatiza workflows con agentes.</h1>

        <p>
          Plataforma B2B para coordinar organizations, integrations, workflows,
          runs, approvals y audit logs desde una arquitectura moderna con IA.
        </p>

        <div className="hero-actions">
          <Link href="/dashboard" className="btn btn-primary">
            Entrar al dashboard
          </Link>
          <Link href="/sign-in" className="btn btn-secondary">
            Iniciar sesión
          </Link>
          <Link href="/sign-up" className="btn btn-secondary">
            Crear cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}