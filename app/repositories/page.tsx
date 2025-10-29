import { DashboardLayout } from "@/components/dashboard-layout"
import { RepositoryHealthPage } from "@/components/repository-health-page"

export default function RepositoriesPage() {
  return (
    <DashboardLayout>
      <RepositoryHealthPage />
    </DashboardLayout>
  )
}
