var MongoClient = require('mongodb').MongoClient;

var URL = 'mongodb://localhost:27017/data';

//open the connection to our mongodb using the URL above 
MongoClient.connect(URL, function(err, db){
    
    //if there is an error deal with it 
    if(err) return;
    
    //okay lets create a collection
    var collection = db.collection('urls');
    
    //put a document in that collection 
      collection.insert({"original_url":"https://www.yahoo.com/","short_url":"https://ide.c9.io/blue5peed/new/2"}, function(err, result) {
          
          db.close();
          
      });

    
});
