import type { User } from "@auth0/auth0-react"
import { ArticleState, type Article } from "~/models/Article"
import { getUserRoles } from "~/userRoles"

const LOCAL_ARTICLES_KEY = "articles"

export function addNewArticle(article: Article) {
    const articlesList = getArticles()

    articlesList.unshift(article)
    localStorage.setItem(LOCAL_ARTICLES_KEY, JSON.stringify(articlesList))
}

export function getArticlesByUserRole(user: User | undefined) {
    const allArticles = getArticles()
    const roles = getUserRoles(user)
    
    if (roles.includes('Admin')) {
        return allArticles
    }

    return allArticles.filter(article => article.state === ArticleState.PUBLISHED)
}

function getArticles(): Article[] {
    const localStorageArticles = localStorage.getItem(LOCAL_ARTICLES_KEY)

    return localStorageArticles ? JSON.parse(localStorageArticles) : []
}
