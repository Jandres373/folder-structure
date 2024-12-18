import SingleUserPage from '@/pages/users/$userId/SingleUserPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return <SingleUserPage params={params} />
}
