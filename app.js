//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { urlencoded } = require("body-parser");
const port = 3800;
var LatestPosts=[{Title: 'About Website' , newblog: 'To add New Blog Visit Compose'}]; // Array to store Users input that comes in  'Post' Object
const _= require('lodash');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hie! This Website is Just Practise of the Web Concepts like EJS and  Express Routing . I am Student Of Chitkara University";
const contactContent = "Contact us Through GitHub Account ";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));



app.get("/",(req,res)=>{
  res.render("home",{startingContent:homeStartingContent,Posts:LatestPosts});
});
app.get("/about",(req,res)=>{
  res.render("about",{AboutContent:aboutContent});
})
app.get("/contact",(req,res)=>{
  res.render("contact",{ContactContent:contactContent});
})
app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.post("/compose",(req,res)=>{

  var Post={
      Title :req.body.BlogTitle,
     newblog : req.body.NewBlog
  };
  LatestPosts.push(Post);
  console.log(LatestPosts); // Storing the Users Input
  res.redirect("/"); // After the Value enter by user it push to our array and we ridirect to home page
}); 


app.get("/post/:UserPosts",(req,res)=>{
  const BrowsersPramas = _.lowerCase(req.params.UserPosts);
  

  LatestPosts.forEach(function(Post){
    const ComposedTitle = _.lowerCase(Post.Title);
   

    if(ComposedTitle === BrowsersPramas){
        res.render("post",{
          Title : Post.Title,
          ContentofTitle : Post.newblog
        });
    }
    else{
      console.log("Sorry No related Post");
    }
  });
});


app.listen(port,()=>{
  console.log(`You are to listening to ${port}`);
});
