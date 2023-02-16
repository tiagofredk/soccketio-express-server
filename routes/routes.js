const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController")
const protect = require("../midleware/protect")

router.post("/api/login", authController.login);

router.post("/api/register", authController.register);

router.get("/api/logout", (authController.logout));

router.post('/api/test2', (req, res, next) => {
  console.log("***********************                  Route unprotected TEST")
  console.log(req.session);
  try {
    res.status(200).json({
      message: "Route unprotected TEST",
      session: req.session
    });
  } catch (error) {
    next(error)
  }
});

// after this point routes are protected
router.use(protect)

router.post("/api/newproject", (authController.newProject));

router.post('/api/test', (req, res, next) => {
  try {
    res.status(200).json({
      message: "Route TEST",
      session: req.session
    });
  } catch (error) {
    next(error);
  }
});
router.get('/api/root', (req, res, next) => {
  try {
    // res.send(`<h1 style={{text-align: "center"}}>Express Socket Server</h1>`);
    res.send({ success: "ok" })
  } catch (error) {
    next(error)
  }
});

router.delete("/api/deleteproject", (authController.deleteProject));


/* GET home page. */
// app.get('/protegido', authController.verifyToken, (req, res) => {
//   // rota protegida aqui
// });

module.exports = router;
