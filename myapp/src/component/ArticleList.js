import {Link} from "react-router-dom";

function ArticleList({articles}){
    return(
        <>
        <h1>List of Articles</h1>
        {articles.map((article)=>(
            <Link key={article.name} className="article-list-item" to={`/articles/${article.name}`}>
                <h3>{article.name}</h3>
                <p>{article.content[0].substring(0,100)}</p>
              
            </Link>
     ))}
      </>
    );
}

export default ArticleList;