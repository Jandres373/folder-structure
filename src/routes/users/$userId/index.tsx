import SingleUserPage from '@/views/users/SingleUserPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return <SingleUserPage params={params} />
}
