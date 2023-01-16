import { ArticleInterface } from "src/app/shared/types/Article.interface"

export interface GetFeedResponseInterface {
    articles: ArticleInterface[]
    articlesCount: number
}