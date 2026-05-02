import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ROLEX | The Submariner - A Crown for Every Achievement',
  description:
    'Explore the timeless excellence of the Rolex Submariner. A journey through heritage, precision, and the ultimate symbol of innovation.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} antialiased bg-[#0d0d0d]`}>
        {children}
      </body>
    </html>
  );
}
