// import express from "express";

// let articleInfo =[
//      {
//           name: "split-js",
//           likes: 0,
//           comments: []
//      },
//      {
//           name: "map-js",
//           likes: 0,
//           comments: []
//      },
//      {
//           name: "filter-js",
//           likes: 0,
//           comments: []
//      }
//    ];
// const app=express();
// app.use(express.json());

// const findArticle= (name) => articleInfo.find(article => article.name===name);

// app.put("/api/articles/:name/likes", (req, res)=>{
//       const {name} = req.params;
//       //const article = articleInfo.find(article => article.name===name);
//       const article = findArticle(name);
//       if(article){
//           article.likes +=1;
//           res.send(`The article ${article.name} has ${article.likes} likes!`);
//       }
//       else{
//           res.send(`article not found`);
//       }
// });

// app.post("/api/articles/:name/comments", (req, res)=>{
//      const {name} = req.params;
//      const {by, comment} = req.body;
//      const article = articleInfo.find(article => article.name===name);
//      if(article){
//          article.comments.push({by,comment});
//          res.send(article.comments);
//      }
//      else{
//           res.send(`Article doesn't exist!`);
//      }
// });


// app.listen(8000, ()=>{
//      console.log("listening on 8000");
// });




import express  from "express";
import { db,connectToDb } from "./db.js";

const app= express();
app.use(express.json());

// const findArticle=(name)=>articleInfo.find((article) => article.name === name);

app.get('/api/articles/:name', async (req,res) =>{
 const { name } = req.params;

 const article = await db.collection("articles").findOne({ name });
 if(article){
    res.json(article);
 }else{
    res.sendStatus(404);  
 }
});

//likes
    app.put("/api/articles/:name/likes",async (req,res) => {
    const { name } = req.params;
  await db.collection("articles").updateOne({name}, {$inc:{likes:1}});
   const article = await db.collection("articles").findOne({name});
    if (article){
        res.json(article);
    }else{
        res.sendStatus(404); 
    }
    });

//comments
    app.post("/api/articles/:name/comments", async (req, res) =>{
    const {name} = req.params;
    const {by,comment} = req.body;

    await db.collection("articles").updateOne(
        {name}, 
        {$push:{comments:{ by, comment}}}
        );
   
    const article = await db.collection("articles").findOne({name});
    if(article) {
        res.json(article);
    }
    else{
        res.sendStatus(404); 
    }
    });


connectToDb(()=> {
    console.log("succesfully connected to database");
    app.listen(8000,() =>{
        console.log("Listening on http://localhost:8000");
})
});