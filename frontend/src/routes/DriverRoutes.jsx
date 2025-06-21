import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const DriverRoutes = () => {
    const { token, user } = useAuth()

    if(!token && !user ){
        return <Navigate to={"/home"}/>
    }
    if (!user?.isDriver) {
        return <Navigate to={"/home"} />
    }

    return <Outlet/>
}