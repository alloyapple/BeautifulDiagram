import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { SITE_URL, GA_MEASUREMENT_ID } from '@/lib/config';
import { Analytics } from '@/components/seo/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.png',
  },
  verification: GA_MEASUREMENT_ID ? {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  } : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
