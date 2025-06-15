import { Metadata } from 'next';
import Navigation from '../components/shared/Navigation';
import { mainFont } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Raffle Tracker',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.className} antialiased min-h-screen flex flex-col bg-light-primary text-dark-primary`}
      >
        <div className="flex flex-col h-screen">
          <Navigation />
          <main className="flex-1 flex justify-center px-8 py-4">
            <div className="max-w-4xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
