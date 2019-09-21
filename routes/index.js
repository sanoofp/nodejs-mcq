const router = require("express").Router();

// @route GET /
router.get("/", (req, res) => {
  res.send("HEY")
})

module.exports = router;