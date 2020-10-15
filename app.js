var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    Article               = require("./models/article.js"),
    seedDB                = require("./seed.js"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    port = process.env.PORT || 1000;


    // local database
    // mongoose.connect("mongodb://localhost/articles");

    // Onilne database - mongoDB atlas
    mongoose.connect('mongodb+srv://admin:admin@cluster0.kdkhc.mongodb.net/test?retryWrites=true&w=majority',
 {
     useNewUrlParser: true,
     useCreateIndex: true
 }).then(()=>{
     console.log('connected to db');
 }).catch(err =>{
     console.log('ERROR: err.message');
 });


//  To look for files in public directory
 app.use(express.static("public"));


// Seeding
seedDB();

// For POST method
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Home page
app.get('/', function(req, res){
    res.render("home.ejs");
});

// List all articles
//      and 
// Search an article
app.get("/articles", function(req, res){

    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all found articles from DB
        Article.find({ $or: [ { title: regex }, { content: regex } ] }, function(err, allArticles){
           if(err)  console.log(err);
            res.render("list.ejs", {items:allArticles});
        });
    } else {
        // List all articles
        Article.find({},function(err,items){
            if(err)console.log(err);
            else{res.render("list.ejs",{items:items});}
         });
    }
});

// Create an article
app.get('/new', function(req, res){
    res.render("new.ejs");
});

app.post('/articles', function(req, res){
    var title = req.body.title;
    var content = req.body.content;

    var item = {title:title, content:content};

    Article.create(item, function(err, newlyaddedtodb){
        if(err)console.log(err);
        else{
            console.log(newlyaddedtodb);
            res.redirect("/articles");
        }});
});

// Get an article using an id
app.get('/articles/:id', function(req, res){
    Article.findById(req.params.id,  function(err, founditem){
        if(err)console.log(err);
        else{
            res.render("show.ejs" ,{items:founditem});
        }
    });
});


// Search regex helper function
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// PORT 1000
app.listen(port, ()=>{
        console.log("listening on port 1000");
})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
    
    
    