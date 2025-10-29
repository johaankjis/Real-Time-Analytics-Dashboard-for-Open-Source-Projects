import { NextResponse } from "next/server"

export async function GET() {
  // Mock metrics data
  const metrics = {
    events: {
      total: 1200000,
      last24h: 45000,
      avgPerHour: 1875,
    },
    performance: {
      avgLatency: 142,
      p95Latency: 285,
      p99Latency: 450,
      throughput: 8500,
    },
    repositories: {
      total: 847,
      active: 623,
      avgHealth: 88,
    },
    system: {
      uptime: 99.8,
      errorRate: 1.2,
      cacheHitRate: 85,
    },
  }

  return NextResponse.json(metrics)
}
