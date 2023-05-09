const request = require("supertest");
const path = require("path");

const app = require("../app");
const User = require("../model/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

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

test("Not register with invalid name", async () => {
  await request(app)
    .post("/user/register")
    .send({
      // name: 'erfan', No name
      email: "erfantest2@gmail.com",
      password: "erfantest1234@",
    })
    .expect(400);
});

test("Not register with invalid email", async () => {
  await request(app)
    .post("/user/register")
    .send({ name: "erfan2", email: "erfantest", password: "erfantest1234@" })
    .expect(400);
});

test("Not register with invalid password", async () => {
  await request(app)
    .post("/user/register")
    .send({
      name: "erfan2",
      email: "erfantest2@gmail.com",
      password: "erfan",
    })
    .expect(400);
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

test("Update user profile", async () => {
  const response = await request(app)
    .patch("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "erfan edited" })
    .expect(200);

  expect(response.body.name).toBe("erfan edited");
});

test("Not update user profile unauthorized", async () => {
  await request(app)
    .patch("/user/me")
    .send({ name: "erfan edited" })
    .expect(401);
});

test("Not update user profile with invalid email", async () => {
  const response = await request(app)
    .patch("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ email: "invalidemail" })
    .expect(400);

  expect(response.body.email).not.toBe("invalidemail");
});

test("Not update user profile with invalid password", async () => {
  const response = await request(app)
    .patch("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ password: "test" })
    .expect(400);
});

test("Not update invalid field for user", async () => {
  await request(app)
    .patch("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "My home address" })
    .expect(400);

  const user = User.findById(userOneId);
  expect(user.location).toBeUndefined();
});

test("Upload user avatar", async () => {
  const response = await request(app)
    .post("/user/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", path.resolve(__dirname, "fixtures/profile-pic.jpg"))
    .expect(200);

  const user = await User.findById(response.body._id);
  expect(user.avatar).toEqual(expect.any(Buffer));
});
