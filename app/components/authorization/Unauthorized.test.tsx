import { render, screen } from '@testing-library/react'
import Unauthorized from './Unauthorized'

describe('Unauthorized', () => {

    test('should render access denied message', () => {
        render(<Unauthorized />)

        expect(screen.getByRole('heading', { name: /access denied/i })).toBeInTheDocument()
        expect(screen.getByText(/you do not have permission/i)).toBeInTheDocument()
    })
})
