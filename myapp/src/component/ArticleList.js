import ArticleList from "../component/ArticleLst";
import {Link} from "react-router-dom";
import articles from "../pages/articles-content";

function ArticleList({articles}){
    return(
        <>
        <h1>List of Articles</h1>
        {articles.map((article)=>(
            <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                <h3>{article.name}</h3>
                <p>{article.content[0].sustring(0,98)}...</p>
            </Link>
     ))}
      </>
    );
}

export default ArticleList;