const {ObjectID} = require("mongodb");

var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose");
var {Todo} = require("./models/todo");
var {User} = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  //Create new todo with the requested text
  var todo = new Todo({
    text:req.body.text
  });
  //Save todo to the DB
  todo.save().then((doc) => {
    //Send back the saved data
    res.send(doc)
  }, (e) => {
    //respond with a status code 400 if request failed
    res.status(400).send(e);
  });
});

  app.get("/todos", (req, res) => {
    //Get all todos
    Todo.find().then((todos) => {
      res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
  });
  //Get a speccific todo
  app.get("/todos/:id", (req,res) => {
    var id = req.params.id;
    //Check if the id structure is valid
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    //Find the TODO
    Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send(todo);
      //In case of an error return a status code of 400
    }).catch((e) => res.status(400).send());
  });

app.listen(3000, () => {
  console.log("Started on port 3000");
});

module.exports = {app};
