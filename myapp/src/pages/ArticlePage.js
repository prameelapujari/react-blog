import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentList from "../component/CommentsList";
import AddCommentForm from "../component/AddCommentForm";
import articles from "./articles-content";

function ArticlePage(){
    const [articleInfo, setArticleInfo]= useState({likes:0, comments:[]});
    const {articleId} = useParams();
    
    useEffect(()=>{
    // setArticleInfo({likes:7655, comments:[]});
      const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo =response.data;
      setArticleInfo(newArticleInfo);
      }

      loadArticleInfo();
    },[articleId]);
    
    const article = articles.find(article=> article.name === articleId);

    const addLikes = async () => {
        const response =await axios.put(`/api/articles/${articleId}/likes`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);

    };
        
    if(article){
        return(
            <>
            <h1>{article.title}</h1>
            <div className="upvote-section"> 
                <button onClick={addLikes}>Like</button>
            </div>
            <p>
                {article.title} has {articleInfo.likes} likes!...
            </p>
            {article.content.map((paragraph,i) =>(
                <p key={i}>{paragraph} </p> 
            ))}
            
            <AddCommentForm
              articleName={articleId}
              onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
            ></AddCommentForm>

            <CommentList comments={articleInfo.comments}></CommentList>
            </>
        );
    }
    else{
        return <NotFoundPage></NotFoundPage>
       }
    }
export default ArticlePage;