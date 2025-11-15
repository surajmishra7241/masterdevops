// src/app/layout.tsx
import type { Metadata } from "next";

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
