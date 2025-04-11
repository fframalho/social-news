import { render, screen, fireEvent } from '@testing-library/react'
import Logout from './Logout'

// Mock useAuth0
const mockLogout = vi.fn()

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        logout: mockLogout
    })
}))

describe('Logout', () => {

    beforeEach(() => {
        mockLogout.mockClear()
    })

    test('should render the logout button', () => {
        render(<Logout />)

        const button = screen.getByTestId('logout-button')

        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/log out/i)
    })

    test('should call logout with returnTo param on click', () => {
        render(<Logout />)

        const button = screen.getByTestId('logout-button')

        fireEvent.click(button)

        expect(mockLogout).toHaveBeenCalledTimes(1)
        expect(mockLogout).toHaveBeenCalledWith({
            logoutParams: { returnTo: window.location.origin }
        })
    })
})
