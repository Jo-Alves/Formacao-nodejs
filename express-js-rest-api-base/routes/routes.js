const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const PasswordTokenController = require("../controllers/PasswordTokenController");

router.get('/', HomeController.index);
router.get("/user/:id", UserController.findUserById);
router.get("/users", UserController.findAllUser);
router.post("/user", UserController.saveUser);
router.put("/user", UserController.saveUser);
router.delete("/user/:id", UserController.deleteUser);
router.post("/recoverpassword", PasswordTokenController.recoverPassword);
router.put("/changepassword", PasswordTokenController.changePassword);

module.exports = router;