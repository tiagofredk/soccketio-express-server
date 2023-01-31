const express = require('express');
const router = express.Router();
const authController = require("../controllers/authController")
const protect = require("../midleware/protect")

router.post("/login", authController.login );

router.post("/register", authController.register );


// after this point routes are protected
router.use(protect)

router.get('/', function(req, res, next) {
  try {
    res.send(`<h1 style={{text-align: "center"}}>Express Socket Server</h1>`);
  } catch (error) {
    next(error)
  }
});
/* GET home page. */
// app.get('/protegido', authController.verifyToken, (req, res) => {
//   // rota protegida aqui
// });

module.exports = router;
