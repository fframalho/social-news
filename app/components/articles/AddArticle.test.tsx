import { render, screen } from '@testing-library/react'
import AddArticle from './AddArticle'

test('should have title', () => {
    render(<AddArticle />)

    expect(screen.getByTestId('add-article-title')).toHaveTextContent(/add article/i)

})
