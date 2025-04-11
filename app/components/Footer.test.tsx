import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
    test('should render footer with correct text', () => {
        render(<Footer />)

        expect(screen.getByTestId('footer')).toHaveTextContent('© 2025 Social News Platform')
    })
})
