const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/updatePassword", userController.updatePassword);

router.post("/deleteUser", userController.deleteUser);

router.get("/", userController.getAllUsers);

router.get("/getUserByEmail/:email", userController.getUserByEmail);

module.exports = router;
