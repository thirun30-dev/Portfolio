import type { Metadata } from 'next';
import { Outfit, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thirunavukkarasu Veeramani — Robotics Engineer',
  description: 'Thirunavukkarasu Veeramani — Robotics & Automation Engineer and Embedded Systems Developer based in Chennai, India.',
  keywords: 'Robotics, Automation, ESP32, ROS, Python, Data Science, Embedded Systems, Chennai, Tamil Nadu, React, Next.js',
  authors: [{ name: 'Thirunavukkarasu Veeramani' }],
  openGraph: {
    title: 'Thirunavukkarasu Veeramani — Robotics Engineer',
    description: 'Building intelligent robotic systems from the ground up. Bridging hardware and software.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body>
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
