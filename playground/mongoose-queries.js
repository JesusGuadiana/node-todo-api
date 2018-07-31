const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");


var id = "5b5f9e29a7591d6844f711c2";

 if(!ObjectID.isValid(id)){
   console.log("The id is not valid");
 };

Todo.find({
  _id: id
}).then((todos) => {
  console.log("Todos", todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log("Todo", todo);
});

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log("Id not found");
  }
  console.log("Todo by Id ", todo);
}).catch((e) => console.log(e));

 id = "5b50c267abbd0c34493717d7";

if(!ObjectID.isValid(id)){
  console.log("The user id is not valid");
};

User.findById(id).then((user) => {
  if(!user){
  return console.log("User not found");
  }
  console.log("User by id", user);
}).catch((e) => console.log(e));
