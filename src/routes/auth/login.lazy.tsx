import { createLazyFileRoute } from '@tanstack/react-router'
import LoginPage from '../../features/auth/login/pages/LoginPage'

export const Route = createLazyFileRoute('/auth/login')({
  component: LoginPage,
})
