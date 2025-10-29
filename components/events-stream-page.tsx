"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, GitCommit, GitPullRequest, GitMerge, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Event types
const eventTypes = ["push", "pull_request", "merge", "issue", "release", "deploy"] as const
type EventType = (typeof eventTypes)[number]

// Mock event data
const mockEvents = Array.from({ length: 50 }, (_, i) => {
  const types: EventType[] = ["push", "pull_request", "merge", "issue", "release", "deploy"]
  const statuses = ["success", "pending", "failed"]
  const repos = ["vercel/next.js", "facebook/react", "microsoft/vscode", "nodejs/node", "rust-lang/rust", "golang/go"]

  const type = types[Math.floor(Math.random() * types.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const repo = repos[Math.floor(Math.random() * repos.length)]

  return {
    id: `evt-${1000 + i}`,
    type,
    status,
    repo,
    user: `user${Math.floor(Math.random() * 100)}`,
    message: getEventMessage(type),
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    duration: Math.floor(Math.random() * 5000) + 100,
  }
})

function getEventMessage(type: EventType): string {
  const messages = {
    push: "Pushed 3 commits to main branch",
    pull_request: "Opened pull request #1234",
    merge: "Merged PR #1234 into main",
    issue: "Created issue #5678",
    release: "Published release v2.0.0",
    deploy: "Deployed to production",
  }
  return messages[type]
}

function getEventIcon(type: EventType) {
  const icons = {
    push: GitCommit,
    pull_request: GitPullRequest,
    merge: GitMerge,
    issue: AlertCircle,
    release: CheckCircle2,
    deploy: CheckCircle2,
  }
  return icons[type]
}

function getStatusColor(status: string) {
  const colors = {
    success: "text-success",
    pending: "text-warning",
    failed: "text-destructive",
  }
  return colors[status as keyof typeof colors] || "text-muted-foreground"
}

function getStatusBadgeVariant(status: string): "default" | "secondary" | "destructive" {
  const variants = {
    success: "default" as const,
    pending: "secondary" as const,
    failed: "destructive" as const,
  }
  return variants[status as keyof typeof variants] || "default"
}

export function EventsStreamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<EventType | "all">("all")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.user.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || event.type === selectedType

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Events Stream</h2>
        <p className="text-muted-foreground">Real-time feed of all repository events</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events, repositories, or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              {eventTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="capitalize"
                >
                  {type.replace("_", " ")}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">
            Recent Events <span className="text-muted-foreground font-normal">({filteredEvents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEvents.slice(0, 20).map((event) => {
              const Icon = getEventIcon(event.type)
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-4 rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className={cn("mt-0.5 rounded-full p-2 bg-primary/10", getStatusColor(event.status))}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{event.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.repo} • {event.user}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(event.status)} className="capitalize flex-shrink-0">
                        {event.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                      <span>•</span>
                      <span>{event.duration}ms</span>
                      <span>•</span>
                      <span className="capitalize">{event.type.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-sm font-medium">No events found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
