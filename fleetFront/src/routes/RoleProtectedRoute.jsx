import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../utils/auth";
const RoleProtectedRoute = ( {allowedRoles}) =>{
    const role = getUserRole();
    if (!role) return <Navigate to="/login" />;
    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to ="/unauthorized" />;
};
 export default RoleProtectedRoute;