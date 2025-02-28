import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layouts/MainLayout';

const geistPoppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistPoppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
