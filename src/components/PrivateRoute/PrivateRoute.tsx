import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const { currentUser } = useSelector((state: RootState) => state.user)
    return currentUser.id ? <Outlet /> : <Navigate to="/log-in" />
}

export default PrivateRoute
