const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController");
const protect = require("../midleware/protect");

router.post("/api/login", authController.login);

router.post("/api/register", authController.register);

// after this point routes are protected
router.use(protect);

router.post("/api/newchannel", (authController.newChannel));

router.post("/api/newproject", (authController.newProject));

router.delete("/api/deleteproject", (authController.deleteProject));

router.post("/api/logout", (authController.logout));

/* GET home page. */
// app.get('/protegido', authController.verifyToken, (req, res) => {
//   // rota protegida aqui
// });

module.exports = router;
