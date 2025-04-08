import { useAuth0 } from "@auth0/auth0-react";

function Logout() {
    const { logout } = useAuth0();

    return (
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </button>
    );
}

export default Logout
