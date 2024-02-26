import { useParams} from "react-router-dom";
import articles from "./articles-content";
import NotFoundPage from "./NotFoundPage";

function ArticlePage(){
    const {articleId} = useParams();
    const article = articles.find(article=>
        article.name === articleId);
        
    if(article){
        return(
            <>
            <h1>{article.title}</h1>

            {article.content.map((paragraph,i) =>(
                <div key={i}>
                 {paragraph}
                </div>
                   
             
            ))}
            </>
        );
    }
    else{
        return <NotFoundPage></NotFoundPage>
       }
    }
    
export default ArticlePage;