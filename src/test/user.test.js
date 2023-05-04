const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = require("../app");
const User = require("../model/user");
const { deleteUser } = require("../controller/user");

// userOne is used for testing auth routes
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Test",
  email: "test-user@gmail.com",
  password: "test-user-1234-@",
  tokens: [{ token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET) }],
};

beforeEach(async () => {
  await User.deleteMany();

  await new User(userOne).save();
});

test("Register new user", async () => {
  const response = await request(app)
    .post("/user/register")
    .send({
      name: "erfan",
      email: "erfantest@gmail.com",
      password: "erfantest1234@",
    })
    .expect(201);

  const newUser = await User.findById(response.body.user._id);
  expect(newUser).not.toBeNull();

  expect(response.body).toMatchObject({
    user: { email: "erfantest@gmail.com", name: "erfan" },
    token: newUser.tokens[0].token,
  });
});

test("Login user", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Not login user wrong password", async () => {
  await request(app)
    .post("/user/login")
    .send({ email: userOne.email, password: "wrongpassword" })
    .expect(400);
});

test("Get profile", async () => {
  await request(app)
    .get("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
});

test("Not get profile unauthorized", async () => {
  await request(app).get("/user/me").expect(401);
});

test("Delete user", async () => {
  await request(app)
    .delete("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  const deletedUser = await User.findById(userOneId);
  expect(deletedUser).toBeNull();
});

test("Not delete user unauthorized", async () => {
  await request(app).delete("/user/me").expect(401);

  const deletedUser = await User.findById(userOneId);
  expect(deletedUser).not.toBeNull();
});