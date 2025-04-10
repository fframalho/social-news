export enum ArticleState {
    DRAFT,
    PUBLISHED
}

export interface Article {
    id: number
    title: string
    description: string
    image: string
    category: string
    content: string
    state: ArticleState
}
