import usePageProps from './use_page_props'

export default function useUser() {
  const { user } = usePageProps<{
    user?: {
      fullName: string
      email: string
      role: 'admin' | 'doctor' | 'lab'
    }
  }>()

  if (!user) return null

  return {
    fullName: user?.fullName,
    email: user?.email,
    role: user?.role,
  }
}
