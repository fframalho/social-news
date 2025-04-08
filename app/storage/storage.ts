import type { Article } from "~/models/Article";

const LOCAL_ARTICLES_KEY = "articles";

export function addNewArticle(article: Article) {
    const articlesList = getArticles()

    articlesList.push(article)
    localStorage.setItem(LOCAL_ARTICLES_KEY, JSON.stringify(articlesList))
}

export function getArticles(): Article[] {
    const localStorageArticles = localStorage.getItem(LOCAL_ARTICLES_KEY)

    return localStorageArticles ? JSON.parse(localStorageArticles) : []
}
