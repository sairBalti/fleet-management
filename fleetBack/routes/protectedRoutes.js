const express = require("express");
const { authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/manager-only", authorizeRoles("Manager"), (req, res) => {
  res.json({ message: "Welcome, Manager!" });
});

router.get("/driver-only", authorizeRoles("Driver"), (req, res) => {
  res.json({ message: "Welcome, Driver!" });
});

module.exports = router;