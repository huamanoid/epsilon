var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    Article               = require("./models/article.js"),
    seedDB                = require("./seed.js"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    port = process.env.PORT || 1000;


    app.use(express.static("public"));
    // mongoose.connect("mongodb://localhost/pasta_dishes");
     mongoose.connect('mongodb+srv://aman:letmein01@cricmaniac-ereth.mongodb.net/test?retryWrites=true&w=majority',
 {
     useNewUrlParser: true,
     useCreateIndex: true
 }).then(()=>{
     console.log('connected to db');
 }).catch(err =>{
     console.log('ERROR: err.message');
 });



// Seeding
seedDB();


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Home page
app.get('/', function(req, res){
    res.send("Welcome Home");
});

// List all articles
app.get('/articles', function(req, res){
    // res.render("list.ejs");
    Article.find({},function(err,items){
        if(err)console.log(err);
        else{res.render("list.ejs",{items:items});}
     });
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
    // res.send("what's up nigga")
    Article.findById(req.params.id,  function(err, founditem){
        if(err)console.log(err);
        else{
            res.render("show.ejs" ,{items:founditem});
        }
    });
});

// Search an article
// app.get("/search/:name", function(req, res){
//     var regex = RegExp(req.params.name, 'i');
//     Article.find({title:regex}).then((result)=>{
//         res.status(200).json(result);
//     })
// });

// PORT 1000
app.listen(port, ()=>{
        console.log("listening on port 1000");
})
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
    
    
    