// Packages
const express = require("express");
const router = express.Router();

// Controllers
const {
  getCpuData,
  getNetworkData,
  getMemoryData
} = require("../Controllers/GraphController");

// Helpers
const { asyncHandler } = require("../utils/helper.js");

/**
 * @name "api/graph"
 * @desc Endpoint for user graph data.
 */
router.get(
  "/:user",
  asyncHandler(async (req, res) => {
    const user = req.params.user;
    const cpu = await getCpuData(user);
    const network = await getNetworkData(user);
    const memory = await getMemoryData(user);

    console.log(user);
    res.status(200).json({ cpu: cpu, network: network, memory: memory });
  })
);

module.exports = router;
