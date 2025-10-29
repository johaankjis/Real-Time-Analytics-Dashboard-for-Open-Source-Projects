import { DashboardLayout } from "@/components/dashboard-layout"
import { EventsStreamPage } from "@/components/events-stream-page"

export default function EventsPage() {
  return (
    <DashboardLayout>
      <EventsStreamPage />
    </DashboardLayout>
  )
}
