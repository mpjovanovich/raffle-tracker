import { Geist, Geist_Mono } from 'next/font/google';
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
        <nav className="w-full border-b">
          {/* Add your navigation content here */}
        </nav>
        <main className="flex-1 flex items-center justify-center p-8 sm:p-20">
          <div className="max-w-4xl">{children}</div>
        </main>
      </body>
    </html>
  );
}
