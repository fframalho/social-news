import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import LoginButton from "./authentication/Login";
import Logout from "./authentication/Logout";

function Navbar() {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <Link to="/" className="text-lg font-semibold">
                        Home
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <span>Welcome, {user?.name}</span>
                            <Logout />
                        </>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
