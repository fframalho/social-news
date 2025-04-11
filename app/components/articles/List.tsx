import { getArticlesByUserRole } from "~/storage/storage"
import ArticleInfo from "./ArticleInfo"
import type { Article } from "~/models/Article"
import { useEffect, useState } from "react"
import Authorized from "../authorization/Authorized"
import { useAuth0 } from "@auth0/auth0-react"

const ARTICLES_PER_PAGE: number = 4

function renderOtherArticles(otherArticles: Article[]) {
    return (
        <div className="flex flex-wrap mt-10">
            {otherArticles?.map((article) => {
                return (
                    <div key={article.id} className="w-full sm:w-1/2 md:w-1/2 p-4">
                        <ArticleInfo
                            article={article}
                            buttonClassNames="w-32 py-2 text-sm"
                            imageFirst={true}
                            imageHeight="h-32"
                            descriptionTextSize="text-sm"
                            titleTextSize="text-xl"
                        />
                    </div>
                )
            })}
        </div>
    )
}

function renderEmptyArticles() {
    return <p className="text-center mt-10">No articles available.</p>
}

function List() {
    const [ articles, setArticles ] = useState<Article[]>([])
    const [ visibleItemsCount, setVisibleItemsCount ] = useState(ARTICLES_PER_PAGE)
    const { user } = useAuth0()

    useEffect(() => {
        setArticles(getArticlesByUserRole(user))
    }, [])

    if (articles.length === 0) {
        return renderEmptyArticles()
    }

    const [ mainArticle, ...otherArticles ] = articles
    const otherArticlesToShow = otherArticles.slice(0, visibleItemsCount)
    const hasMoreArticlesToLoad = visibleItemsCount < otherArticles.length

    const handleLoadMoreClick = () => {
        setVisibleItemsCount((previousValue) => previousValue + ARTICLES_PER_PAGE)
    }
    
    return (
        <Authorized authorizedRoles={ ['Admin', 'Regular'] }>
            <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl space-y-6">
                {/* Main Article */}
                <ArticleInfo
                    article={mainArticle}
                    buttonClassNames="w-48 py-3"
                    imageHeight="h-64"
                    descriptionTextSize="text-base"
                    titleTextSize="text-3xl"
                />

                { /* Categories */ }
                <div className="flex items-center gap-4 mt-20">
                    <span className="font-medium text-gray-700">Categories</span>
                    <button
                        className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 text-gray-500" 
                        data-testid="marketing-button"
                    >
                        Marketing
                    </button>
                    <button
                        className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 text-gray-500"
                        data-testid="design-button"
                    >
                        Design
                    </button>
                    <button
                        className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 text-gray-500"
                        data-testid="engineering-button"
                    >
                        Engineering
                    </button>
                </div>

            
                {/* Other Articles */}
                {
                    renderOtherArticles(otherArticlesToShow)
                }

                {/* Load More Button */}
                { hasMoreArticlesToLoad && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleLoadMoreClick}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-gray-200 rounded-sm text-sm shadow cursor-pointer"
                            data-testid="load-more-button"
                        >
                            Load more
                        </button>
                    </div>
                )}
            </div>
        </Authorized>
    )

}

export default List
