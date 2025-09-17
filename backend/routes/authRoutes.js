const express = require("express");
const { signup, login, getUsers } = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", getUsers); // For testing purposes

module.exports = router;
