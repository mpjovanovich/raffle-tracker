import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex h-screen">
          <nav className="w-40 md:w-60 lg:w-60 border-r p-4">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
            </ul>
          </nav>
          <main className="flex-1 flex items-center justify-center p-8 sm:p-20">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
