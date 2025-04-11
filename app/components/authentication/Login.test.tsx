import { render, screen, fireEvent } from '@testing-library/react'
import LoginButton from './Login'

// Mock useAuth0
const mockLoginWithRedirect = vi.fn()

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        loginWithRedirect: mockLoginWithRedirect
    })
}))

describe('LoginButton', () => {

    beforeEach(() => {
        mockLoginWithRedirect.mockClear()
    })

    test('should render the login button', () => {
        render(<LoginButton />)

        const button = screen.getByTestId('login-button')

        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent(/log in/i)
    })

    test('should call loginWithRedirect on click', () => {
        render(<LoginButton />)
        const button = screen.getByTestId('login-button')

        fireEvent.click(button)

        expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1)
    })
})
