import { useAuth0 } from "@auth0/auth0-react"

function LoginButton() {
    const { loginWithRedirect } = useAuth0()

    return <button 
        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 text-white rounded cursor-pointer"
        onClick={() => loginWithRedirect()}
        data-testid="login-button"
    >
        Log In
    </button>
}

export default LoginButton
