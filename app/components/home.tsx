import { useAuth0 } from "@auth0/auth0-react"
import List from "./articles/List"

export default function Home() {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

    if (isLoading) {
        return <div className="text-lg font-medium max-w-screen-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl space-y-6">Loading...</div>
    }

    if (isAuthenticated) {
        return <List />
    }

    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="p-8">
                <h1 className="text-4xl font-bold font-mono" data-testid="home-title">Welcome to Social News Platform</h1>
                <p className="text-gray-600 mt-10" data-testid="home-description">A community to share your social news.</p>

                <div className="flex mt-6">
                    <button
                        onClick={() => loginWithRedirect()}
                        className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-gray-200 rounded-sm text-sm shadow cursor-pointer"
                        data-testid="read-social-news-button"
                    >
                        Read Social News
                    </button>
                </div>
            </div>
        </main>
    )
}
