import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
    let tokenExists = localStorage.getItem('token') ? true : false;
    return (
        tokenExists ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes
