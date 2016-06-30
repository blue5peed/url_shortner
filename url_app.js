'use strict';

var express = require('express');
var validUrl = require('valid-url');
var MongoClient = require('mongodb').MongoClient;

var myURL = 'mongodb://localhost:27017/data'; //this is the one that we use to connect dont confuse with the request later 

var nArray = 0;

var app = express();
//this is just for the homepage nothing else so I use app.get
/*
app.get('/', function(req, res){
    
    res.send('Homepage with usage infomation');
    res.end();
    
});
*/
// I use app.use here because I want to get any link that starts with new and so on 
app.use('/new', function(req, res){
    
    var url = req.originalUrl;
    
    url =  url.replace("/new/", ""); //replace the first part of the string with nothing
    
    //use the module for checking urls
    if(validUrl.isWebUri(url)){
        
        console.log(url);
        //find document with url if it exists return document json
        MongoClient.connect(myURL, function(err, db){
            if(err){console.log('database connection error')}
            
            var urls = db.collection('urls'); //open this collection put cusor on it 
            
            urls.find().toArray(function(err, a){ nArray = nArray + a.length+1;});  //this will be used for short url
            
            
            urls.find({ "original_url":url}).toArray(function(err, docs){
                
                if(err){console.log('cant find document')}
                
                
                //if no entry in database create one with short url 
                if(docs[0] == undefined){
                    urls.insert({"original_url":url,"short_url":"https://url-shortner-real-blue5peed.c9users.io/new/"+nArray}, function(err, result) {
                        nArray = 0;
                        console.log('data created array reset');
                        res.redirect(req.get('referer'));
                  });
                  
                }else{
                    res.json(docs[0]);
                }
                
                db.close();
            });
            
        });
        
    } else{
        console.log('damn');
        console.log(url);
        
        //if the database has a short url redirect to the original url 
        MongoClient.connect(myURL, function(err, db){
            if(err){console.log('database connection error')}
            
            var urls = db.collection('urls'); //open this collection put cusor on it 
            var lString = "https://url-shortner-real-blue5peed.c9users.io/new/".concat(url);
            console.log(lString);
            urls.find({"short_url" : lString}).toArray(function(e, d){
                if(d[0] == undefined){
                    res.json({error: 'no url'});
                }else{
                    res.redirect(d[0].original_url);
                }
                db.close();
            });
            
            
        });
        
        //else throw json with error 
        
        
    }
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});