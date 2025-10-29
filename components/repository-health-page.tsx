"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GitBranch, Users, GitPullRequest, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock repository data
const repositories = [
  {
    name: "vercel/next.js",
    health: 95,
    contributors: 2800,
    openPRs: 234,
    openIssues: 1456,
    stars: 125000,
    commits: 45000,
    trend: "up",
    status: "excellent",
  },
  {
    name: "facebook/react",
    health: 92,
    contributors: 1500,
    openPRs: 156,
    openIssues: 892,
    stars: 220000,
    commits: 38000,
    trend: "up",
    status: "excellent",
  },
  {
    name: "microsoft/vscode",
    health: 88,
    contributors: 1200,
    openPRs: 89,
    openIssues: 5234,
    stars: 160000,
    commits: 52000,
    trend: "stable",
    status: "good",
  },
  {
    name: "nodejs/node",
    health: 85,
    contributors: 3100,
    openPRs: 312,
    openIssues: 1123,
    stars: 105000,
    commits: 67000,
    trend: "up",
    status: "good",
  },
  {
    name: "rust-lang/rust",
    health: 78,
    contributors: 2400,
    openPRs: 445,
    openIssues: 6789,
    stars: 95000,
    commits: 89000,
    trend: "down",
    status: "warning",
  },
  {
    name: "golang/go",
    health: 90,
    contributors: 1800,
    openPRs: 178,
    openIssues: 4567,
    stars: 120000,
    commits: 45000,
    trend: "up",
    status: "excellent",
  },
]

const healthDistribution = [
  { name: "Excellent", value: 3, color: "hsl(var(--chart-1))" },
  { name: "Good", value: 2, color: "hsl(var(--chart-2))" },
  { name: "Warning", value: 1, color: "hsl(var(--chart-3))" },
]

const activityData = repositories.map((repo) => ({
  name: repo.name.split("/")[1],
  commits: repo.commits / 1000,
  prs: repo.openPRs,
}))

function getHealthColor(health: number) {
  if (health >= 90) return "text-success"
  if (health >= 75) return "text-chart-2"
  return "text-warning"
}

function getHealthBadge(status: string) {
  const variants = {
    excellent: { variant: "default" as const, label: "Excellent" },
    good: { variant: "secondary" as const, label: "Good" },
    warning: { variant: "outline" as const, label: "Warning" },
  }
  return variants[status as keyof typeof variants] || variants.good
}

function getTrendIcon(trend: string) {
  if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />
  if (trend === "down") return <TrendingDown className="h-3 w-3 text-destructive" />
  return <span className="h-3 w-3" />
}

export function RepositoryHealthPage() {
  const avgHealth = Math.round(repositories.reduce((sum, repo) => sum + repo.health, 0) / repositories.length)
  const totalContributors = repositories.reduce((sum, repo) => sum + repo.contributors, 0)
  const totalPRs = repositories.reduce((sum, repo) => sum + repo.openPRs, 0)
  const totalIssues = repositories.reduce((sum, repo) => sum + repo.openIssues, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Repository Health</h2>
        <p className="text-muted-foreground">Monitor the health and activity of your repositories</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Health Score</CardTitle>
            <GitBranch className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgHealth}%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +5% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Contributors</CardTitle>
            <Users className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContributors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {repositories.length} repositories</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Pull Requests</CardTitle>
            <GitPullRequest className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPRs}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssues.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Health Distribution</CardTitle>
            <p className="text-xs text-muted-foreground">Repository health status breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {healthDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Repository Activity</CardTitle>
            <p className="text-xs text-muted-foreground">Commits and pull requests</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="commits" fill="hsl(var(--chart-1))" radius={4} />
                <Bar dataKey="prs" fill="hsl(var(--chart-2))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Repository List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Repository Details</CardTitle>
          <p className="text-xs text-muted-foreground">Detailed health metrics for each repository</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {repositories.map((repo) => {
              const badge = getHealthBadge(repo.status)
              return (
                <div key={repo.name} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{repo.name}</h3>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                        {getTrendIcon(repo.trend)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {repo.contributors.toLocaleString()} contributors
                        </span>
                        <span className="flex items-center gap-1">
                          <GitPullRequest className="h-3 w-3" />
                          {repo.openPRs} PRs
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {repo.openIssues.toLocaleString()} issues
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getHealthColor(repo.health)}`}>{repo.health}%</div>
                      <p className="text-xs text-muted-foreground">Health Score</p>
                    </div>
                  </div>
                  <Progress value={repo.health} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
