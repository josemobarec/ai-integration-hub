import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="auth-page">
      <div className="auth-frame">
        <section className="auth-copy">
          <div className="hero-badge">Get started</div>
          <h1>Crea tu cuenta y configura tu workspace.</h1>
          <p>
            Regístrate para explorar el producto, navegar entre módulos y
            probar el flujo completo del hub de integraciones con IA.
          </p>
        </section>

        <section className="auth-card">
          <SignUp />
        </section>
      </div>
    </main>
  );
}