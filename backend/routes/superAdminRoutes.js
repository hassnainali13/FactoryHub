const express = require("express");
const { getAllWorkspaces, approveWorkspace, rejectWorkspace } = require("../controllers/superAdminController");
const authenticate = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const User = require("../models/User"); // path sahi hai?


const router = express.Router();

// GET all workspaces
router.get("/workspaces", authenticate, allowRoles("superadmin"), getAllWorkspaces);

// PUT to approve a workspace
router.put("/workspaces/:id/approve", authenticate, allowRoles("superadmin"), approveWorkspace);

// PUT to reject a workspace
router.put("/workspaces/:id/reject", authenticate, allowRoles("superadmin"), rejectWorkspace);

// DELETE to reject a workspace (instead of PUT)
router.delete(
  "/workspaces/:id/reject",
  authenticate,
  allowRoles("superadmin"),
  rejectWorkspace
);
router.get("/users", authenticate, allowRoles("superadmin"), async (req, res) => {
  try {
    const users = await User.find(); // sab users fetch karenge
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
