import { ThemeProvider } from '@/components/theme/ThemeProvider';
import ProgressTopBar from '@/components/ProgressTopBar';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Toaster } from '@/components/ui/toaster';
import Container from '@/components/Container';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ezrent | Auth',
  description:
    'ezRent adalah platform penyewaan inovatif untuk pengguna individu dan bisnis. Pengalaman penyewaan yang mudah dengan berbagai barang dan layanan.',
  manifest: '/manifest.json',
  icons: {
    icon: '/ezrent.png',
    apple: '/ezrent.png',
  },
  generator: 'http://ezrent.my.id',
  applicationName: 'Ezrent',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Ezrent',
    'Website Ezrent',
    'Platform Penyewaan',
    'Pengalaman Penyewaan',
  ],
  creator: 'Ezrent Teams',
  publisher: 'Ezrent',
  formatDetection: {
    email: 'ezrent@gmail.com',
    address: 'Pulau Jawa, Indonesia',
    telephone: '0813987326',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: 'black',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ProgressTopBar />
            <Container>{children}</Container>
            <Toaster />
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
