"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, TrendingUp, GitPullRequest, CheckCircle2 } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

// Mock data
const eventData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  events: Math.floor(Math.random() * 50000) + 30000,
  cached: Math.floor(Math.random() * 20000) + 10000,
}))

const repoData = [
  { name: "vercel/next.js", events: 12500, contributors: 2800 },
  { name: "facebook/react", events: 9800, contributors: 1500 },
  { name: "microsoft/vscode", events: 8200, contributors: 1200 },
  { name: "nodejs/node", events: 6500, contributors: 3100 },
  { name: "rust-lang/rust", events: 5800, contributors: 2400 },
]

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  time: `${i * 2}h`,
  latency: Math.floor(Math.random() * 200) + 100,
  throughput: Math.floor(Math.random() * 1000) + 500,
}))

export function OverviewPage() {
  const [colors, setColors] = useState({
    chart1: "#3b82f6",
    chart2: "#10b981",
    chart3: "#f59e0b",
    muted: "#6b7280",
    popover: "#1f2937",
    border: "#374151",
  })

  useEffect(() => {
    // Get computed colors from CSS variables
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)

    setColors({
      chart1: computedStyle.getPropertyValue("--color-chart-1").trim() || "#3b82f6",
      chart2: computedStyle.getPropertyValue("--color-chart-2").trim() || "#10b981",
      chart3: computedStyle.getPropertyValue("--color-chart-3").trim() || "#f59e0b",
      muted: computedStyle.getPropertyValue("--color-muted-foreground").trim() || "#6b7280",
      popover: computedStyle.getPropertyValue("--color-popover").trim() || "#1f2937",
      border: computedStyle.getPropertyValue("--color-border").trim() || "#374151",
    })
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events Processed</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              50% faster than baseline
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Repositories</CardTitle>
            <GitPullRequest className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground mt-1">Across 12 organizations</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Reliability</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +25% improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Event Processing (24h)</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time event ingestion with caching</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={eventData}>
                <defs>
                  <linearGradient id="events" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart1} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colors.chart1} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cached" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.chart2} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colors.chart2} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" stroke={colors.muted} fontSize={12} tickLine={false} />
                <YAxis
                  stroke={colors.muted}
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors.popover,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "0.5rem",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="events"
                  stroke={colors.chart1}
                  fill="url(#events)"
                  strokeWidth={2}
                  name="Events"
                />
                <Area
                  type="monotone"
                  dataKey="cached"
                  stroke={colors.chart2}
                  fill="url(#cached)"
                  strokeWidth={2}
                  name="Cached"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">API Performance</CardTitle>
            <p className="text-xs text-muted-foreground">Latency and throughput metrics</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <XAxis dataKey="time" stroke={colors.muted} fontSize={12} tickLine={false} />
                <YAxis stroke={colors.muted} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors.popover,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "0.5rem",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke={colors.chart1}
                  strokeWidth={2}
                  dot={false}
                  name="Latency (ms)"
                />
                <Line
                  type="monotone"
                  dataKey="throughput"
                  stroke={colors.chart3}
                  strokeWidth={2}
                  dot={false}
                  name="Throughput"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Repositories */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Top Active Repositories</CardTitle>
          <p className="text-xs text-muted-foreground">Most active projects in the last 24 hours</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={repoData} layout="vertical">
              <XAxis type="number" stroke={colors.muted} />
              <YAxis type="category" dataKey="name" stroke={colors.muted} fontSize={12} width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.popover,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <Bar dataKey="events" fill={colors.chart1} radius={4} name="Events" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
