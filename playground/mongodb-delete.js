// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if(err){
    return console.log("Unable to connect to MongoDB Server");
  }
  console.log("Connected to MongoDB Server");
  //deleteMany TODOS
  db.collection("Todos").deleteMany({text:"Eat lunch"}).then((result) => {
    console.log(result);
  })

  //deleteOne TODO
  db.collection("Todos").deleteOne({text:"Eat lunch"}).then((result) => {
    console.log(result);
  });

  //find One TODO And Delete
  db.collection("Todos").findOneAndDelete({completed:false}).then((result) => {
    console.log(result);
  });

  //Delete all Users with name = "Jesus Guadiana"
  db.collection("Users").deleteMany({name: "Jesus Guadiana"}).then((result) => {
    console.log("All the users with name Jesus Guadiana were deleted");
  });

  //Delete the user with id = 5b4f70edc3b7c8237434ed11
  db.collection("Users").findOneAndDelete({_id:new ObjectID("5b4f70edc3b7c8237434ed11")}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });
  // db.close();
});
