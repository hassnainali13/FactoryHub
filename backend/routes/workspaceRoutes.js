const express = require("express");
const upload = require("../middleware/multer"); // Import multer for file uploads
const {
  createWorkspace,
  requestWorkspace,
  joinWorkspace,
  getAllWorkspaces,
} = require("../controllers/workspaceController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// POST route for creating a workspace
router.post("/create", authenticate, upload.single("logo"), createWorkspace);

// POST route for requesting a workspace
router.post("/request", authenticate, requestWorkspace);

// POST route for users to join a workspace
router.post("/join", authenticate, joinWorkspace);

router.get("/", authenticate, getAllWorkspaces); // public workspace list



module.exports = router;
