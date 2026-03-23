import { useAuth } from "@/context/authContext"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps{
    children:React.ReactNode
}


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) return <Navigate to="/login" />
  
  return children
}
export default ProtectedRoute
