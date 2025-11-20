// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Master DevOps | Cloud Infra, Automation & Freelancing",
  description:
    "Master DevOps provides cloud infrastructure design, CI/CD pipelines, Kubernetes setups, and automation across AWS, GCP, Azure, and on-prem. Learn DevOps, build infra, and hire a DevOps freelancer.",
  metadataBase: new URL("https://masterdevops.in"),
  keywords: [
    "DevOps",
    "DevOps freelancer",
    "DevOps jobs",
    "DevOps learning",
    "AWS DevOps",
    "GCP DevOps",
    "Azure DevOps",
    "Kubernetes",
    "CI/CD pipelines",
    "infrastructure as code",
    "cloud infrastructure setup",
    "DevOps automation",
    "on-prem DevOps",
  ],
  openGraph: {
    title: "Master DevOps | Cloud Infra & Automation",
    description:
      "Production-grade DevOps, infrastructure setup, CI/CD pipelines, and automation for AWS, GCP, Azure, and on-prem.",
    url: "https://masterdevops.in",
    siteName: "Master DevOps",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Master DevOps - Cloud Infrastructure & Automation',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master DevOps | Cloud Infra & Automation",
    description:
      "DevOps freelancing, infrastructure design, and automation with Kubernetes, Terraform, and GitHub Actions.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.json',
  // Remove themeColor and viewport from here
};

// Add separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#00d4ff',
}

type RootLayoutProps = {
  children: React.ReactNode;
};

const GA_ID = "G-JY0LRM9996";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Links - Updated to use your existing files */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#00d4ff" />
        <meta name="msapplication-TileColor" content="#00d4ff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preload Critical Resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className="relative min-h-screen flex flex-col bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}