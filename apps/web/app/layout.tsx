import type { Metadata } from 'next';
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Integration Hub',
  description: 'B2B AI integration hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <div style={{ fontWeight: 700 }}>AI Integration Hub</div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton />
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}