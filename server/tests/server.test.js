const expect = require("expect");
const request = require("supertest");
const {ObjectID} = require("mongodb")

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
  text:'First test todo',
  _id:new ObjectID()
}, {
  text:'Second test todo',
  _id:new ObjectID
}];

//Clear the DB before the tests
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe("POST / todos", () => {
  it("Should create a new Todo", (done) => {
    var text = "Test todo";
    //Make a post request to the api with text="Test todo"
    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe("Test todo");
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }
        //Fetch all the todos in the DB and check its lenght to be 1 (Newly created TODO)
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  });
});

it("Should not create todo with invalid body data", (done) => {
  //Try to post a TODO without a text
  request(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err){
        return done(err);
      }
      //Fetch all the TODOS and expect the lenght to be 0 (Invalid TODO so its not inserted into the DB)
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
});

describe("GET /todos", () => {
  it("Should get all Todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("Should get the specific todo", (done) => {
    request(app)
      .get("/todos/" + todos[0]._id.toHexString())
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("Should return a 404 if todo not found", (done) => {
    var randomId = new ObjectID;

    request(app)
      .get("/todos/" + randomId.toHexString())
      .expect(404)
      .end(done)
  });

  it("Should return 404 for non object IDS", (done) => {
    request(app)
      .get("/todos/123")
      .expect(404)
      .end(done)
  });
});

describe("DELETE /todos/:id", () => {
  it("Should delete a todo", (done) => {
     var hexId = todos[1]._id.toHexString();

    request(app)
      .delete("/todos/" + hexId)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) =>{
        if(err){
          return done(err);
        }
        //query database using ding byID
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it("Should return a 404 if todo not found", (done) => {
    var randomId = new ObjectID;

    request(app)
      .delete("/todos/" + randomId.toHexString())
      .expect(404)
      .end(done)
  });

  it("Should return 404 for non object IDS", (done) => {
    request(app)
      .delete("/todos/123")
      .expect(404)
      .end(done)
  });
});
