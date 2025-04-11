import { render, screen } from '@testing-library/react'
import Authorized from './Authorized'
import { Navigate } from 'react-router'

// Mock Auth0
const mockUseAuth0 = {
  isAuthenticated: true,
  isLoading: false,
  user: { email: 'test@example.com' },
}

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => mockUseAuth0
}))

// Mock getUserRoles
vi.mock('~/userRoles', () => ({
    getUserRoles: (user: any) => user?.roles ?? []
}))

// Mock <Navigate> to inspect navigation
vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router')

    return {
        ...actual,
        Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>
    }
})

describe('Authorized', () => {

    test('should show loading when isLoading is true', () => {
        mockUseAuth0.isLoading = true
        
        render(<Authorized authorizedRoles={['Admin']}><div>Content</div></Authorized>)
        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    test('should redirect to /unauthorized if not authenticated', () => {
        mockUseAuth0.isLoading = false
        mockUseAuth0.isAuthenticated = false

        render(
            <Authorized authorizedRoles={['Admin']}>
                <div>Content</div>
            </Authorized>
        )
        expect(screen.getByTestId('navigate')).toHaveTextContent('/unauthorized')
    })

    test('should redirect to /unauthorized if user lacks required role', () => {
        mockUseAuth0.isAuthenticated = true
        mockUseAuth0.user = { roles: ['User'] } // has role 'User', needs 'Admin'

        render(
            <Authorized authorizedRoles={['Admin']}>
                <div>Content</div>
            </Authorized>
        )
        expect(screen.getByTestId('navigate')).toHaveTextContent('/unauthorized')
    })

    test('should render children if user is authorized', () => {
        mockUseAuth0.user = { roles: ['Admin'] }

        render(
            <Authorized authorizedRoles={['Admin']}>
                <div>Content</div>
            </Authorized>
        )
        expect(screen.getByText('Content')).toBeInTheDocument()
    })
})
