import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Samiq Bukhari | Data Sciences & Web Developer',
  description:
    'I am Syed Samiq Abbas Bukhari, a passionate Data Sciences student at PUCIT Lahore, creating modern and AI-driven web experiences.',
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
