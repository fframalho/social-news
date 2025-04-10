import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { getUserRoles } from "~/userRoles";


interface AuthorizedProps {
    children: React.ReactNode;
    authorizedRoles: string[];
}

function Authorized({children, authorizedRoles}: AuthorizedProps) {
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
        return <div className="text-lg font-medium max-w-screen-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl space-y-6">Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/unauthorized" replace />;
    }

    const roles = getUserRoles(user)
    const hasAccess = authorizedRoles.some(authorizedRole => roles.includes(authorizedRole))

    if (!hasAccess) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default Authorized;
