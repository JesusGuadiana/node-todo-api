const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

//Clear the DB before the tests
beforeEach((done) => {
  Todo.remove({}).then(() => done());
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
        Todo.find().then((todos) => {
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
});
