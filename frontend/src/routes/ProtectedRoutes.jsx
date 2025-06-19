import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const ProtectedRoute = () => {
    const { token, user } = useAuth()

    if(!token && !user ){
        return <Navigate to={"/connect"}/>
    }

    return <Outlet />
}