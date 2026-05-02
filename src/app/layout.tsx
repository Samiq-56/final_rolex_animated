import type { Metadata } from 'next';
import { 
  Playfair_Display, 
  Cormorant_Garamond, 
  DM_Sans, 
  Space_Mono 
} from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ROLEX | The Submariner - A Crown for Every Achievement',
  description:
    'Experience the ultimate symbol of excellence, performance, prestige and innovation. The Rolex Submariner.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased bg-[#0A0A0A] text-[#FAFAFA] selection:bg-gold selection:text-black">
        {children}
      </body>
    </html>
  );
}
