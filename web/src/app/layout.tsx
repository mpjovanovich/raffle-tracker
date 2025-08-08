import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
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
        <Toaster />
        <Navigation />
        <main className="flex-1 flex justify-center p-4">
          {/* <div className="min-w-full sm:min-w-[600px] md:min-w-[720px]"> */}
          <div className="min-w-full sm:min-w-[600px] md:min-w-[650px]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
