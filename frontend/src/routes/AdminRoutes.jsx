import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const AdminRoutes = () => {
    const { token, user } = useAuth()

    if(!token && !user ){
        return <Navigate to={"/home"}/>
    }
    if (!user?.isAdmin) {
        return <Navigate to={"/home"} />
    }

    return <Outlet/>
}