import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="auth-page">
      <div className="auth-frame">
        <section className="auth-copy">
          <div className="hero-badge">Secure access</div>
          <h1>Inicia sesión y entra al hub.</h1>
          <p>
            Accede al workspace, revisa workflows, approvals, runs y auditoría
            desde una interfaz unificada.
          </p>
        </section>

        <section className="auth-card">
          <SignIn />
        </section>
      </div>
    </main>
  );
}