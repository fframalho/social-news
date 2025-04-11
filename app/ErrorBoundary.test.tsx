import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './root'

// Mock isRouteErrorResponse
vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        isRouteErrorResponse: (e: any) => !!e.status,
    }
})

describe('ErrorBoundary', () => {
    test('should render 404 error message', () => {
        render(<ErrorBoundary error={{ status: 404, statusText: 'Not Found' }} />)

        expect(screen.getByText('404')).toBeInTheDocument()
        expect(screen.getByText(/could not be found/i)).toBeInTheDocument()
    })

    test('should render generic error message', () => {
        render(<ErrorBoundary error={{ status: 500, statusText: 'Internal Server Error' }} />)

        expect(screen.getByText('Error')).toBeInTheDocument()
        expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
    })

    test('should render stack trace in DEV', () => {
        import.meta.env.DEV = true // simulate dev mode
        const error = new Error('Oh no!')

        render(<ErrorBoundary error={error} />)

        expect(screen.getByText('Oh no!')).toBeInTheDocument()
        expect(screen.getByRole('code')).toBeInTheDocument()
    })
})
