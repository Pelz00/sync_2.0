/**
 * Root layout for the entire Sync app.
 *
 * - Loads the three brand fonts (Bricolage Grotesque, Inter, JetBrains Mono)
 *   via next/font/google. Next still self-hosts and inlines them at build
 *   time, so no external request is made at runtime.
 * - Exposes each font as a CSS variable consumed by `globals.css` →
 *   `--font-display | --font-body | --font-mono`.
 * - Every route group ((marketing) / (auth) / (app) / (vendor) / (admin))
 *   gets its own nested layout that adds its specific shell on top of this.
 */
import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/QueryClientProvider';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sync — your campus, in one app',
    template: '%s · Sync',
  },
  description:
    'Sync is the verified marketplace for Nigerian student life — hostels, food, events, beauty, trades, laundry and more, all in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-surface text-foreground font-body flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
