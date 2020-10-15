var mongoose    = require("mongoose"),
    article     = require("./models/article.js")
    
var data = [

        {title  : "Bhopal Based Appointy’s Never Say Never Attitude", 
        content : "“I easily visited about 100 companies pitching Extreme Call Manager but did not meet with success. My shoes were torn in the process. I remember during that time I was rejected by a client even before I could tell him about the product when he saw my torn shoes.”"
        },

        {title  : "Four Bhopal based engineers build top scheduling applications worldwide", 
        content : "In a re-telling of the classic rags-to-riches tale, four engineers in Bhopal have built a technology tool that is regarded as one of the top scheduling applications worldwide. The product, aptly named as Appointy is being used by 58,000 clients globally and is delivering net revenue of about Rs 24 lakh every month for the six-yearold company."
        },
        
        {title  : "abc", 
        content : "xyz"
        },
        
        {title  : "xyz", 
        content : "abc"
        },

        
        
    ]

function seedDB(){
    console.log("helo")
    //remove all articles
    article.remove({},function(err){

        if(err){
            console.log(err);
        }    
        else console.log("removed article");
    // add articles from data
             data.forEach(function(seed){
                 article.create(seed,function(err,newdata){
                     if(err)console.log(err);
                     else console.log("added an article!!!");
                    
                    console.log("*created*");
                    newdata.save();
                    
                    
                 })
             })
    });
  
}

module.exports = seedDB;
    
    
