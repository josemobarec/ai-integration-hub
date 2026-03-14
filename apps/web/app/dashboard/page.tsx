import { auth } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Ruta protegida.</p>
      <p>User ID: {userId}</p>
    </div>
  );
}