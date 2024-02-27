import articles from "./articles-content";
import ArticleList from "../component/ArticleList";


function ArticlesListPage(){
    return(
        <>
        <h1>List of Articles</h1>
        <ArticleList articles={articles}></ArticleList>
        </>
    );
}

export default ArticlesListPage;