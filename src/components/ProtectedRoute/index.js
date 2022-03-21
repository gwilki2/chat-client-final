import { Fragment } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({redirectTo}) => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    return (
        <Fragment>
            {isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />}
        </Fragment>
    )
}

export default ProtectedRoute
