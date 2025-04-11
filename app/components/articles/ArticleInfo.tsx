import type { Article } from "~/models/Article"

interface ArticleInfoProps {
    article: Article
    buttonClassNames: string
    imageFirst?: boolean
    imageHeight: string
    titleTextSize: string
    descriptionTextSize: string
}

function ArticleInfo({ article, buttonClassNames, descriptionTextSize, imageFirst, imageHeight, titleTextSize }: ArticleInfoProps) {
    return (
        <div className={ `flex flex-col space-y-4 md:space-y-0 md:space-x-4 ${imageFirst ? 'md:flex-row-reverse' : 'md:flex-row'}` }>
            <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                    <h1
                        className={ `w-full ${titleTextSize} font-bold text-gray-800 mb-6` }
                        data-testid="article-info-title"
                    >
                        { article.title }
                    </h1>

                    <p
                        className={ `${descriptionTextSize} font-bold text-gray-600 mb-4` }
                        data-testid="article-info-description"
                    >
                        { article.description }
                    </p>
                </div>

                <button
                    className={ `${buttonClassNames} bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer` }
                    data-testid="read-more-button"
                >
                    Read More
                </button>
            </div>
            <div className="flex-1 p-4">
                <img
                    src={article.image}
                    alt="Preview"
                    className={`${imageHeight} w-full object-cover`}
                    data-testid="article-info-image"
                />
            </div>
        </div>
    )
}


export default ArticleInfo
