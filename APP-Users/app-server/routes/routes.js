const { Router } = require("express")
const router = Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const PasswordTokenController = require("../controllers/PasswordTokenController");
const adminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.get("/user/:id", UserController.findUserById);
router.get("/users", adminAuth, UserController.findAllUser);
router.post("/user", UserController.saveUser);
router.put("/user", adminAuth, UserController.saveUser);
router.delete("/user/:id", adminAuth, UserController.deleteUser);
router.post("/recoverpassword", PasswordTokenController.recoverPassword);
router.put("/changepassword", PasswordTokenController.changePassword);
router.post("/login", UserController.login);
router.post("/validate", adminAuth, HomeController.validate);

module.exports = router;