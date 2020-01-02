// Packages
const express = require("express");
const router = express.Router();

// Helper
const { asyncHandler } = require("../utils/helper.js");

/**
 * @name "api/graph"
 * @desc Endpoint for user graph data.
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.status(200).json({ msg: "Data" });
  })
);

module.exports = router;
