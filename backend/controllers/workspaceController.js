const mongoose = require("mongoose");
const Workspace = require("../models/Workspace");
const User = require("../models/User");

exports.createWorkspace = async (req, res) => {
  try {
    // Ensure user is logged in
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Destructure the body to extract workspace details
    const { workspaceName, workspaceCode, role } = req.body;

    // Validate input fields
    if (!workspaceName || !workspaceCode || !role) {
      return res.status(400).json({ message: "Workspace name, code, and role are required" });
    }

    console.log("Creating workspace for user:", req.userId);

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if workspace code already exists
    const existingWorkspace = await Workspace.findOne({ code: workspaceCode });
    if (existingWorkspace) {
      return res.status(400).json({ message: "Workspace code already exists" });
    }

    // Create workspace
    const workspace = await Workspace.create({
      name: workspaceName,
      code: workspaceCode,
      status: "pending",  // Initial status as pending
      createdBy: req.userId,  // Correct user ID
      logo: req.file?.path || null,  // Optional logo file
      role: role, // Assign role to workspace (if needed)
    });

    // Link workspace to user and assign role
    user.workspaceId = workspace._id;  // Assign workspace to user
    user.role = role;  // Assign the role to the user
    await user.save();

    // Return success response with workspace details
    res.status(201).json({
      message: "Workspace created successfully and role assigned to user",
      workspace,
    });
  } catch (error) {
    console.error("Workspace creation error:", error);
    res.status(500).json({ message: "Server error while creating workspace" });
  }
};

exports.requestWorkspace = async (req, res) => {
  try {
    const { userId, workspaceName, workspaceCode } = req.body;

    // Validate input fields
    if (!userId || !workspaceName || !workspaceCode) {
      return res.status(400).json({ message: "User ID, workspace name, and code are required" });
    }

    // Check if workspace code already exists
    const exists = await Workspace.findOne({ code: workspaceCode });
    if (exists) {
      return res.status(400).json({ message: "Workspace code already exists" });
    }

    // Create the workspace and set its status as pending
    const workspace = await Workspace.create({
      name: workspaceName,
      code: workspaceCode,
      status: "pending",  // Workspace status set to pending
      createdBy: userId,  // User ID who is requesting
    });

    // Update the user's role to admin and assign the workspace ID
    await User.findByIdAndUpdate(userId, {
      role: "admin", // Set user role to admin
      workspaceId: workspace._id,
    });

    res.status(201).json({
      message: "Workspace request submitted. Waiting for approval.",
      workspace,
    });
  } catch (error) {
    console.error("Workspace request error:", error);
    res.status(500).json({ message: "Server error while processing workspace request" });
  }
};

exports.joinWorkspace = async (req, res) => {
  try {
    const { userId, workspaceCode } = req.body;

    // Validate input fields
    if (!userId || !workspaceCode) {
      return res.status(400).json({ message: "User ID and workspace code are required" });
    }

    // Find the workspace by the provided code
    const workspace = await Workspace.findOne({ code: workspaceCode });

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    if (workspace.status !== "active") {
      return res.status(400).json({ message: "Workspace is not active yet" });
    }

    // Update user's role to "user" and link them to the workspace
    await User.findByIdAndUpdate(userId, {
      role: "user", // Set user role to user when joining workspace
      workspaceId: workspace._id,
    });

    res.status(200).json({ message: "Joined workspace successfully", workspaceId: workspace._id });
  } catch (error) {
    console.error("Join workspace error:", error);
    res.status(500).json({ message: "Server error while joining workspace" });
  }
};


// GET all workspaces
exports.getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find()
      .populate("createdBy", "name email role") // populate name, email, role
      .sort({ createdAt: -1 });

    const formatted = await Promise.all(
      workspaces.map(async (ws) => {
        const employees = await User.countDocuments({ workspaceId: ws._id });
        return {
          _id: ws._id,
          name: ws.name,
          admin: ws.createdBy?.name || "N/A",
          adminEmail: ws.createdBy?.email || "N/A",
          adminRole: ws.createdBy?.role || "N/A",
          employees,
          status: ws.status,
          logo: ws.logo || null,
          code: ws.code,
        };
      })
    );

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Get workspaces error:", error);
    res.status(500).json({ message: "Server error while fetching workspaces" });
  }
};