import { fireEvent, render, screen } from "@testing-library/react"

// Mock Authorized component
vi.mock('../authorization/Authorized', () => ({
    default: ({ children }) => children
}))

describe('List', () => {
    let ListComponent: React.FC

    beforeEach(async () => {
        // reset mocks between tests
        vi.resetModules()
    })

    async function importListComponent() {
        const mod = await import('./List')
        ListComponent = mod.default
    }

    test('should render no articles available message', async () => {
        vi.doMock('~/storage/storage', () => ({
            getArticlesByUserRole: () => []
        }))

        await importListComponent()
      
        render(<ListComponent />)
        expect(screen.getByText(/no articles available/i)).toBeInTheDocument()
    })

    test('should render main and other articles', async () => {
        const mockArticles = Array.from({ length: 6 }, (_, i) => ({
            id: i + 1,
            title: `Article ${i + 1}`,
            content: 'Content...',
            description: 'Description...',
            image: 'img.jpg',
            category: 'marketing',
            state: 1
        }))
      
        vi.doMock('~/storage/storage', () => ({
            getArticlesByUserRole: () => mockArticles
        }))

        await importListComponent()
      
        render(<ListComponent />)
      
        // Main article
        expect(await screen.findByText('Article 1')).toBeInTheDocument()
      
        // Other articles (should show 4 initially)
        expect(screen.getByText('Article 2')).toBeInTheDocument()
        expect(screen.queryByText('Article 6')).not.toBeInTheDocument()
    })

    test('should load more articles when "Load more" is clicked', async () => {
        const mockArticles = Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          title: `Article ${i + 1}`,
          content: '...',
          description: '...',
          image: 'img.jpg',
          category: 'engineering',
          state: 1,
        }))

        vi.doMock('~/storage/storage', () => ({
            getArticlesByUserRole: () => mockArticles
        }))
      
        await importListComponent()
      
        render(<ListComponent />)
      
        // Click load more
        const button = await screen.findByTestId('load-more-button')
        
        fireEvent.click(button)
      
        // Check if more articles are rendered
        expect(await screen.findByText('Article 6')).toBeInTheDocument()
        expect(screen.getByText('Article 8')).toBeInTheDocument()
      })
      
      test('renders category buttons', async () => {
        await importListComponent()
        render(<ListComponent />)
      
        expect(screen.getByTestId('marketing-button')).toBeInTheDocument()
        expect(screen.getByTestId('design-button')).toBeInTheDocument()
        expect(screen.getByTestId('engineering-button')).toBeInTheDocument()
      })
      
})
