import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import LoginButton from "./authentication/Login";
import Logout from "./authentication/Logout";
import React, { useEffect, useRef, useState } from "react";

function Navbar() {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [ userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <Link to="/" className="text-2xl text-gray-700 font-bold">
                        Social News
                    </Link>
                </div>

                { !isLoading && 
                    <div className="flex items-center space-x-4 relative" ref={userMenuRef}>
                        { isAuthenticated ? (
                            <React.Fragment>
                                <div className="">
                                    <Link to="/articles/new-article" className="text-md text-gray-500 hover:text-gray-600">
                                        Create Article
                                    </Link>
                                </div>
                                <div className="relative" ref={userMenuRef}>
                                    <img
                                        src={user?.picture}
                                        alt="User"
                                        className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    />
                                    {userMenuOpen && (
                                        <div className="absolute top-10 right-0 bg-white border border-gray-400 rounded shadow-md p-2 z-50">
                                            <Logout />
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        ) : (
                            <LoginButton />
                        )}
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;
