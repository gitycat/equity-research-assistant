import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Autonomous Equity Research Platform',
  description: 'Institutional-grade fundamental equity research platform featuring adversarial multi-agent debate and orchestrated synthesis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0E17] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-zinc-200 min-h-screen">
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
