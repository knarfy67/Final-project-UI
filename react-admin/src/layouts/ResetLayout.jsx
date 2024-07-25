import { Navigate, Outlet } from 'react-router-dom';


export const ResetLayout = () => {
    const user = localStorage.getItem("data");
    return (
    user ? <Outlet /> : <Navigate to="/home" />
  )
}
