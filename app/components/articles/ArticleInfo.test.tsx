import { render, screen } from '@testing-library/react'
import ArticleInfo from './ArticleInfo'

const mockArticle = {
    id: 1,
    title: 'Awesome Article',
    content: 'Full content here...',
    description: 'Short description for article.',
    image: 'https://example.com/image.jpg',
    category: 'engineering',
    state: 1
}

describe('ArticleInfo', () => {

    test('should render title, description and image', () => {
        render(
            <ArticleInfo
                article={mockArticle}
                buttonClassNames="px-4 py-2"
                imageHeight="h-64"
                titleTextSize="text-2xl"
                descriptionTextSize="text-base"
            />
        )

        expect(screen.getByTestId('article-info-title')).toBeInTheDocument()
        expect(screen.getByTestId('article-info-description')).toBeInTheDocument()
        expect(screen.getByTestId('article-info-image')).toHaveAttribute('src', mockArticle.image)
        expect(screen.getByTestId('read-more-button')).toBeInTheDocument()
    })

    test('should apply imageFirst layout when prop is true', () => {
        const { container } = render(
            <ArticleInfo
                article={mockArticle}
                buttonClassNames="px-4 py-2"
                imageHeight="h-64"
                titleTextSize="text-2xl"
                descriptionTextSize="text-base"
                imageFirst
            />
        )

        const wrapper = container.firstChild as HTMLElement

        expect(wrapper.className).toContain('md:flex-row-reverse')
    })

    test('should apply title and description size classes', () => {
        render(
            <ArticleInfo
                article={mockArticle}
                buttonClassNames="px-4 py-2"
                imageHeight="h-64"
                titleTextSize="text-3xl"
                descriptionTextSize="text-sm"
            />
        )

        const title = screen.getByTestId('article-info-title')

        expect(title.className).toContain('text-3xl')

        const description = screen.getByTestId('article-info-description')

        expect(description.className).toContain('text-sm')
    })

    test('should apply button classes', () => {
        render(
            <ArticleInfo
                article={mockArticle}
                buttonClassNames="px-6 py-3"
                imageHeight="h-64"
                titleTextSize="text-2xl"
                descriptionTextSize="text-base"
            />
        )

        const button = screen.getByTestId('read-more-button')

        expect(button.className).toContain('px-6')
        expect(button.className).toContain('py-3')
    })
})
