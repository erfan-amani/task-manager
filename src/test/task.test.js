const request = require("supertest");

const app = require("../app");
const Task = require("../model/task");
const { setupDatabase, userOne, taskOne, userTwo } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Create new task", async () => {
  const response = await request(app)
    .post("/task")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "New task for test route." })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).not.toBeTruthy();
  expect(task.user).toEqual(userOne._id);
});

test("All task for user one", async () => {
  const response = await request(app)
    .get("/task")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test("Not delete task for other users", async () => {
  const response = await request(app)
    .delete(`/task/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
