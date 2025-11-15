// src/app/layout.tsx
import type { Metadata } from "next";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Master DevOps | Cloud Infra & Automation",
    description:
      "DevOps freelancing, infrastructure design, and automation with Kubernetes, Terraform, and GitHub Actions.",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const GA_ID = "G-JY0LRM9996";

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
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
