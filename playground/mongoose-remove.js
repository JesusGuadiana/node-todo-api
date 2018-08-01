const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

  Todo.remove({}).then((result) => {
    console.log(result);
  });

Todo.findByIdAndRemove("5b61e55f80a36ea8075747ea").then((todo) =>{
    console.log(todo);
});
