import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

// Auth0 mock setup
const mockUseAuth0 = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => mockUseAuth0,
}))

// Stub LoginButton and Logout to avoid side effects
vi.mock('./authentication/Login', () => ({
    default: () => <button data-testid="login-button">Log In</button>,
}))

vi.mock('./authentication/Logout', () => ({
    default: () => <button data-testid="logout-button">Log Out</button>,
}))

// Avoid router errors from <Link>
vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        Link: ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>,
    }
})

describe('Navbar', () => {

    beforeEach(() => {
        mockUseAuth0.isAuthenticated = false
        mockUseAuth0.isLoading = false
        mockUseAuth0.user = null
    })

    test('should render logo link', () => {
        render(<Navbar />)
        expect(screen.getByTestId('social-news-link')).toHaveTextContent(/social news/i)
    })

    test('should show login button when not authenticated', () => {
        render(<Navbar />)
        expect(screen.getByTestId('login-button')).toBeInTheDocument()
    })

    test('should not render auth area while loading', () => {
        mockUseAuth0.isLoading = true
        render(<Navbar />)
        expect(screen.queryByTestId('login-button')).not.toBeInTheDocument()
    })

    test('should show create article link and user image when authenticated', () => {
        mockUseAuth0.isAuthenticated = true
        mockUseAuth0.user = {
            name: 'Test User',
            picture: 'https://example.com/user.jpg',
        }

        render(<Navbar />)

        expect(screen.getByTestId('create-article-link')).toBeInTheDocument()
        expect(screen.getByTestId('user-picture')).toBeInTheDocument()
    })

    test('should toggle logout menu on user image click', () => {
        mockUseAuth0.isAuthenticated = true
        mockUseAuth0.user = { picture: 'https://example.com/user.jpg' }

        render(<Navbar />)

        const avatar = screen.getByTestId('user-picture')

        // Initially not shown
        expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument()

        // Click avatar to open menu
        fireEvent.click(avatar)
        expect(screen.getByTestId('logout-button')).toBeInTheDocument()

        // Click again to close
        fireEvent.click(avatar)
        expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument()
    })

    test('should close user menu when clicking outside', () => {
        mockUseAuth0.isAuthenticated = true
        mockUseAuth0.user = { picture: 'https://example.com/user.jpg' }

        render(<Navbar />)

        const avatar = screen.getByTestId('user-picture')
        fireEvent.click(avatar)

        expect(screen.getByTestId('logout-button')).toBeInTheDocument()

        // Simulate clicking outside (document event)
        fireEvent.mouseDown(document.body)

        expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument()
    })
})
