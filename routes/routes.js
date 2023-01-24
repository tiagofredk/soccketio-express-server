const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth")

router.post("/login", authController.login );

router.get('/', function(req, res, next) {
  res.send(`<h1 style={{text-align: "center"}}>Express Socket Server</h1>`);
});
// after this point routes are protected

/* GET home page. */

module.exports = router;
