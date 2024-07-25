import { Navigate, Outlet } from 'react-router-dom';


export const AuthLayout = () => {
    const user = localStorage.getItem("authToken");
    return (
    user ? <Outlet /> : <Navigate to="/home" />
  )
}
