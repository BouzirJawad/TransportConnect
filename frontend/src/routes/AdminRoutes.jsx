import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const AdminRoutes = () => {
    const { token, user } = useAuth()

    if (!token) {
        return <Navigate to={"/connect"} />
    }
    if (!user?.isAdmin) {
        return <Navigate to={"/"} />
    }

    return <Outlet/>
}