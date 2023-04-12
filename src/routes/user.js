const userRouter = require("express").Router();

const userController = require("../controller/user");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/:id", userController.getUserById);
userRouter.get("/", userController.getAllUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
