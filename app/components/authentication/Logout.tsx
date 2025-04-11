import { useAuth0 } from "@auth0/auth0-react"

function Logout() {
    const { logout } = useAuth0()

    return (
        <button
            className="w-full text-center text-gray-500 font-bold whitespace-nowrap px-4 py-2 rounded cursor-pointer hover:text-gray-600"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            data-testid="logout-button"
        >
            Log Out
        </button>
    )
}

export default Logout
