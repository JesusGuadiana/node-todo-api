// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Connected to MongoDB Server");
  //Insert a TODO to the TODO collection
  db.collection("Todos").insertOne({
    text:"Something to do",
    completed:false
  }, (err, result) => {
    if(err){
      return console.log("Unable to insert TODO", err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  })
  //Insert a USER to the USER collection
  db.collection("Users").insertOne({
    name:"Jesus Guadiana",
    age:24,
    location:"Monterrey"
  }, (err, result) => {
    if(err){
      return console.log("Could not insert user", err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});
