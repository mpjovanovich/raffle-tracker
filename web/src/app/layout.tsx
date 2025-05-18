import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from './components/Navigation';
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
        <div className="flex flex-col h-screen">
          <Navigation />
          <main className="flex-1 flex justify-center p-8 sm:p-20">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
