
export default interface ReceivedArticleDto {
    articleId: number;
    title: string;
    excerpt: string;
    description: string;
    status: "visible" | "hidden";
    userArticles: {
        userId: number,
        createdAt: string,
        user: {
            email: string;
            forename: string;
            surname: string;
            phoneNumber: string;
        }
    }[]
}
