const userRouter = require("express").Router();

const userController = require("../controller/user");
const userAuth = require("../middleware/auth");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", userAuth, userController.getProfile);
userRouter.get("/:id", userController.getUserById);
// userRouter.get("/", userController.getAllUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
