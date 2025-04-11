import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { Auth0Provider } from "@auth0/auth0-react"
import Navbar from "./components/Navbar"
import { useEffect } from "react"
import Footer from "./components/Footer"
import { MockAuth0Provider } from "test-utils/MockAuth0Provider"

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    }
]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

async function loadArticlesToLocalStorage() {
    const articlesKey = "articles"

    // Check if articles are already in localStorage
    if (!localStorage.getItem(articlesKey)) {
        try {
            const response = await fetch("/articles.json")
            const articles = await response.json()

            localStorage.setItem(articlesKey, JSON.stringify(articles))
            console.log("Articles loaded into localStorage.")
        } catch (error) {
            console.error("Failed to load articles:", error)
        }
    }
}

export default function App() {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
    const isTest = import.meta.env.MODE === 'e2e-test';

    const Provider = isTest ? MockAuth0Provider : Auth0Provider;


    useEffect(() => {
        loadArticlesToLocalStorage()
    }, [])

    return (
        <Provider
            {...(!isTest && {
                domain: domain || '',
                clientId: clientId || '',
                authorizationParams: {
                    redirect_uri: window.location.origin
                }
            })}
        >
            <Navbar />
            <Outlet />
            <Footer />
        </Provider>
    )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!"
    let details = "An unexpected error occurred."
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error"
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}
