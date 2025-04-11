import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest'
import { addNewArticle, getArticlesByUserRole } from './storage'
import { ArticleState } from '~/models/Article'

// Mock getUserRoles
vi.mock('~/userRoles', () => ({
    getUserRoles: (user: any) => user?.roles ?? []
}))

const mockArticle = {
    id: 1,
    title: 'Test',
    description: 'Desc',
    content: 'Content',
    image: 'img.jpg',
    category: 'design',
    state: ArticleState.PUBLISHED
}

const draftArticle = {
    ...mockArticle,
    id: 2,
    title: 'Draft',
    state: ArticleState.DRAFT
}

const STORAGE_KEY = 'articles'

describe('storage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should addNewArticle store new article in localStorage', () => {
        addNewArticle(mockArticle)

        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

        expect(stored).toHaveLength(1)
        expect(stored[0].title).toBe('Test')
    })

    test('should getArticlesByUserRole return all articles for Admin', () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([mockArticle, draftArticle]))

        const user = { roles: ['Admin'] }

        const result = getArticlesByUserRole(user)

        expect(result).toHaveLength(2)
    })

    test('should getArticlesByUserRole return only published articles for Regular user', () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([mockArticle, draftArticle]))

        const user = { roles: ['Regular'] }

        const result = getArticlesByUserRole(user)

        expect(result).toHaveLength(1)
        expect(result[0].state).toBe(ArticleState.PUBLISHED)
    })

    test('should getArticlesByUserRole return empty array if no articles', () => {
        const user = { roles: ['Admin'] }

        expect(getArticlesByUserRole(user)).toEqual([])
    })
})
