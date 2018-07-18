// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Connected to MongoDB Server");
  //Find  the TODO in the DB with the ObjectID 5b4f7279d124eea69dcf7b87
  db.collection("Todos").find({
    _id:new ObjectID("5b4f7279d124eea69dcf7b87")
  }).toArray().then((docs) => {
    console.log("Todos");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch documents", err);
  });
  //Count all the TODOS in the DB
  db.collection("Todos").find().count().then((count) => {
    console.log("Todos count = " + count);
  }, (err) => {
    console.log("Unable to fetch documents", err);
  });
  //Find all the users with name = "Jesus Guadiana"
  db.collection("Users").find({
    name:"Jesus Guadiana"
  }).toArray().then((docs) => {
    console.log("USERS WITH NAME JESUS GUADIANA");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch users", err);
  });
  //Count all the users in the DB
  db.collection("Users").find().count().then((count) => {
    console.log("Total users");
    console.log("Users count = " + count);
  }, (err) => {
    console.log("Failed to do the count", err);
  });
  // db.close();
});
