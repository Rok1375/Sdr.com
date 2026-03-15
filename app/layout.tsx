import type {Metadata} from 'next';
import { Inter, Playfair_Display, Roboto_Flex } from 'next/font/google';
import Script from 'next/script';
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
    <html lang="en" className={`scroll-smooth bg-[#050507] ${inter.variable} ${playfair.variable} ${robotoFlex.variable}`}>
      <body className="font-sans antialiased text-white min-h-screen relative" suppressHydrationWarning>
        <div className="fixed w-full h-full left-0 top-0 -z-50" data-us-project="aH0ZsntZ1TcKHIyweEA8"></div>
        <div className="fixed inset-0 bg-black/40 -z-40 pointer-events-none" aria-hidden="true"></div>
        <div className="noise-overlay" aria-hidden="true"></div>
        <Script id="unicorn-studio" strategy="lazyOnload">
          {`!function(){var u=window.UnicornStudio;if(u&&u.init){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){u.init()})}else{u.init()}}else{window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.1/dist/unicornStudio.umd.js",i.onload=function(){if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){UnicornStudio.init()})}else{UnicornStudio.init()}},(document.head||document.body).appendChild(i)}}();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
