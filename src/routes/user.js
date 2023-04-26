const userRouter = require("express").Router();

const userController = require("../controller/user");
const userAuth = require("../middleware/auth");
const { avatarUploader } = require("../middleware/upload");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", userAuth, userController.getProfile);
userRouter.get("/:id", userController.getUserById);
// userRouter.get("/", userController.getAllUser);
userRouter.patch("/me", userAuth, userController.updateUser);
userRouter.delete("/me", userAuth, userController.deleteUser);
userRouter.post("/logout", userAuth, userController.logout);
userRouter.post("/logoutAll", userAuth, userController.logoutAll);
userRouter.post(
  "/avatar",
  userAuth,
  avatarUploader.single("avatar"),
  userController.uploadAvatar,
  (error, req, res, next) => res.status(400).send(error.message)
);

module.exports = userRouter;
