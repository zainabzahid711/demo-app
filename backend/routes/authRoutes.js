const express = require("express");
const { signup, getUsers } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", signup);
router.get("/users", getUsers); // For testing purposes

module.exports = router;
