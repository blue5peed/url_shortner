var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://localhost:27017/data';

MongoClient.connect(URL, function(err, db){
    
    //if there is an error deal with it 
    if(err) return;
   
   
   console.log(db.getCollectionNames);
   
    db.close();
   
    
});