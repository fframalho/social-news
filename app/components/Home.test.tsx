import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'

// Mocks Auth0
const mockLoginWithRedirect = vi.fn()
const mockUseAuth0 = {
  isAuthenticated: false,
  isLoading: false,
  loginWithRedirect: mockLoginWithRedirect,
}

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => mockUseAuth0
}))

// Mock List component
vi.mock('./articles/List', () => ({
    default: () => <div data-testid="article-list">[Mocked Article List]</div>
}))

describe('Home', () => {

    beforeEach(() => {
        mockLoginWithRedirect.mockReset()
    })

    test('should show loading message when isLoading is true', () => {
        mockUseAuth0.isLoading = true

        render(<Home />)

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    test('should render article list when authenticated', () => {
        mockUseAuth0.isLoading = false
        mockUseAuth0.isAuthenticated = true

        render(<Home />)

        expect(screen.getByTestId('article-list')).toBeInTheDocument()
    })

    test('should show welcome content when not authenticated', () => {
        mockUseAuth0.isAuthenticated = false

        render(<Home />)

        expect(screen.getByTestId('home-title')).toHaveTextContent(/welcome to social news platform/i)
        expect(screen.getByTestId('home-description')).toHaveTextContent(/a community to share/i)
        expect(screen.getByTestId('read-social-news-button')).toBeInTheDocument()
    })

    test('should call loginWithRedirect on button click', () => {
        render(<Home />)

        const button = screen.getByTestId('read-social-news-button')

        fireEvent.click(button)

        expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1)
    })
})
