import type {Metadata} from 'next';
import { Inter, Playfair_Display, Roboto_Flex } from 'next/font/google';
import { CursorRevealProvider } from './components/CursorRevealProvider';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
});

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
  axes: ['wdth'],
});

export const metadata: Metadata = {
  title: 'Soren — Digital Designer & Creative Director',
  description: 'Soren is a digital designer and creative director crafting cinematic web experiences, motion design, and brand identities for ambitious brands worldwide.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${robotoFlex.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <CursorRevealProvider>{children}</CursorRevealProvider>
      </body>
    </html>
  );
}
