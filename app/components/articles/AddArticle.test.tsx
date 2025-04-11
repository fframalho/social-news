import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AddArticle from './AddArticle'

// Mock Authorized component
vi.mock('../authorization/Authorized', () => ({
    default: ({ children }) => <>{children}</>,
}))

// Mock storage function
vi.mock('~/storage/storage', () => ({
    addNewArticle: vi.fn()
}))

// Mock image
const mockFile = new File(['(image content)'], 'example.png', { type: 'image/png' })

describe('AddArticle', () => {
    test('should have title', () => {
        render(<AddArticle />)
        expect(screen.getByTestId('add-article-title')).toHaveTextContent(/add article/i)

    })

    test('should show validation errors when submitting empty form', async () => {
        render(<AddArticle />)
        fireEvent.click(screen.getByRole('button', { name: /submit/i }))

        await waitFor(() => {
            expect(screen.getByText(/title is required/i)).toBeInTheDocument()
            expect(screen.getByText(/description is required/i)).toBeInTheDocument()
            expect(screen.getByText(/content is required/i)).toBeInTheDocument()
            expect(screen.getByText(/please select a category/i)).toBeInTheDocument()
            expect(screen.getByText(/image is required/i)).toBeInTheDocument()
            expect(screen.getByText(/please select a state for the article/i)).toBeInTheDocument()
        })
    })

    test('should show image preview when uploading an image', async () => {
        render(<AddArticle />)

        const input = screen.getByLabelText(/image/i)

        fireEvent.change(input, {
            target: {
                files: [mockFile]
            }
        })

        await waitFor(() => {
            expect(screen.getByAltText(/preview/i)).toBeInTheDocument()
        })
    })

    test('should submit valid form', async () => {
        const { addNewArticle } = await import('~/storage/storage')

        render(<AddArticle />)

        fireEvent.change(screen.getByTestId('article-title'), {
            target: { value: 'Test Title' }
        })

        fireEvent.change(screen.getByTestId('description-text-area'), {
            target: { value: 'Short desc' }
        })

        fireEvent.change(screen.getByTestId('article-image'), {
            target: {
                files: [mockFile],
            }
        })

        fireEvent.change(screen.getByTestId('article-category'), {
            target: { value: 'engineering' }
        })

        fireEvent.change(screen.getByTestId('content-text-area'), {
            target: { value: 'This is the article content.' }
        })

        fireEvent.change(screen.getByTestId('article-state'), {
            target: { value: '1' }
        })

        fireEvent.click(screen.getByRole('button', { name: /submit/i }))

        await waitFor(() => {
            expect(addNewArticle).toHaveBeenCalled()
        })
    })
})
