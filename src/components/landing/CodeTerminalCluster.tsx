"use client";

import { motion } from "framer-motion";

const panels = [
  {
    title: "pipeline.yml",
    lines: [
      "name: infra-deploy",
      "on: [push]",
      "jobs:",
      "  deploy-prod:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - run: npm test",
      "      - run: terraform apply -auto-approve",
    ],
  },
  {
    title: "eks-cluster.tf",
    lines: [
      'resource "aws_eks_cluster" "prod" {',
      '  name     = "masterdevops-prod"',
      '  version  = "1.31"',
      "  endpoint_private_access = true",
      "  enabled_cluster_log_types = [",
      '    "api", "audit", "controllerManager"',
      "  ]",
      "}",
    ],
  },
  {
    title: "k8s-deployment.yaml",
    lines: [
      "apiVersion: apps/v1",
      "kind: Deployment",
      "metadata:",
      "  name: api-gateway",
      "spec:",
      "  replicas: 3",
      "  template:",
      "    spec:",
      "      containers:",
      '        - image: ghcr.io/masterdevops/api:stable',
    ],
  },
];

export default function CodeTerminalCluster() {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {panels.map((panel, idx) => (
        <motion.div
          key={panel.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-cyber-dark/80 border border-neon-blue/40 shadow-neon-md backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-neon-purple/30 bg-gradient-to-r from-cyber-darker/90 to-panel-dark/80">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[11px] text-gray-300 font-medium">
              {panel.title}
            </span>
            <span className="text-[10px] text-neon-cyan/70 uppercase tracking-wide">
              live
            </span>
          </div>

          {/* Body */}
          <div className="relative px-4 py-3 text-[11px] md:text-[12px] font-mono text-neon-cyan/90">
            <div className="scanline-overlay" />
            <pre className="whitespace-pre leading-relaxed">
              {panel.lines.join("\n")}
            </pre>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
