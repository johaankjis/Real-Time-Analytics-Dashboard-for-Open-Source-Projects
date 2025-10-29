"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock, Zap, TrendingUp } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// API endpoint status
const apiEndpoints = [
  {
    name: "Events API",
    endpoint: "/api/events",
    status: "operational",
    uptime: 99.98,
    avgResponse: 45,
    requests24h: 1250000,
  },
  {
    name: "Repositories API",
    endpoint: "/api/repositories",
    status: "operational",
    uptime: 99.95,
    avgResponse: 78,
    requests24h: 450000,
  },
  {
    name: "Analytics API",
    endpoint: "/api/analytics",
    status: "operational",
    uptime: 99.99,
    avgResponse: 32,
    requests24h: 890000,
  },
  {
    name: "Webhooks API",
    endpoint: "/api/webhooks",
    status: "degraded",
    uptime: 98.5,
    avgResponse: 156,
    requests24h: 320000,
  },
  {
    name: "Search API",
    endpoint: "/api/search",
    status: "operational",
    uptime: 99.92,
    avgResponse: 89,
    requests24h: 670000,
  },
  {
    name: "Auth API",
    endpoint: "/api/auth",
    status: "operational",
    uptime: 99.97,
    avgResponse: 23,
    requests24h: 1100000,
  },
]

// Uptime history (last 30 days)
const uptimeHistory = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  uptime: Math.random() * 2 + 98,
}))

// Response time history (last 24 hours)
const responseTimeHistory = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  time: Math.floor(Math.random() * 50) + 30,
}))

function getStatusBadge(status: string) {
  const variants = {
    operational: { variant: "default" as const, label: "Operational", icon: CheckCircle2, color: "text-success" },
    degraded: { variant: "outline" as const, label: "Degraded", icon: Clock, color: "text-warning" },
    outage: { variant: "destructive" as const, label: "Outage", icon: XCircle, color: "text-destructive" },
  }
  return variants[status as keyof typeof variants] || variants.operational
}

export function ApiStatusPage() {
  const operationalCount = apiEndpoints.filter((api) => api.status === "operational").length
  const avgUptime = (apiEndpoints.reduce((sum, api) => sum + api.uptime, 0) / apiEndpoints.length).toFixed(2)
  const totalRequests = apiEndpoints.reduce((sum, api) => sum + api.requests24h, 0)
  const avgResponse = Math.round(apiEndpoints.reduce((sum, api) => sum + api.avgResponse, 0) / apiEndpoints.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Status</h2>
        <p className="text-muted-foreground">Monitor the health and performance of all API endpoints</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Operational APIs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalCount}/{apiEndpoints.length}
            </div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              All systems healthy
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Uptime</CardTitle>
            <Zap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUptime}%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
            <Zap className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalRequests / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponse}ms</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              Excellent performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Uptime History</CardTitle>
            <p className="text-xs text-muted-foreground">System uptime over the last 30 days</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={uptimeHistory}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  domain={[95, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line type="monotone" dataKey="uptime" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Response Time</CardTitle>
            <p className="text-xs text-muted-foreground">Average response time over 24 hours</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={responseTimeHistory}>
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `${value}ms`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line type="monotone" dataKey="time" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* API Endpoints Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">API Endpoints</CardTitle>
          <p className="text-xs text-muted-foreground">Real-time status of all API endpoints</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiEndpoints.map((api) => {
              const statusInfo = getStatusBadge(api.status)
              const StatusIcon = statusInfo.icon
              return (
                <div
                  key={api.endpoint}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-full p-2 bg-primary/10 ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{api.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{api.endpoint}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">Uptime</p>
                      <p className="text-sm font-semibold">{api.uptime}%</p>
                    </div>
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                      <p className="text-sm font-semibold">{api.avgResponse}ms</p>
                    </div>
                    <div className="text-right hidden lg:block">
                      <p className="text-xs text-muted-foreground">Requests (24h)</p>
                      <p className="text-sm font-semibold">{(api.requests24h / 1000).toFixed(0)}k</p>
                    </div>
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Incidents */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Recent Incidents</CardTitle>
          <p className="text-xs text-muted-foreground">System incidents and resolutions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">Resolved</Badge>
                    <p className="text-sm font-medium">Webhooks API Degradation</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Increased latency detected on webhooks endpoint. Issue resolved by scaling infrastructure.
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago • Duration: 15 minutes</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">Resolved</Badge>
                    <p className="text-sm font-medium">Database Connection Pool Exhaustion</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Temporary connection issues resolved by increasing pool size and optimizing queries.
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago • Duration: 8 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
