import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const geistPoppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'TravelBook',
  description:
    'TravelBook is your personal journal for capturing, sharing, and revisiting unforgettable journeys around the world.',
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
