// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Connected to MongoDB Server");

  db.collection("Todos").findOneAndUpdate({
    _id: new ObjectID("5b4f7af5d124eea69dcf7ff1")
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection("Users").findOneAndUpdate({
    name:"Mike"
  }, {
    $set: {
      name:"Jesus Guadiana"
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal:false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
