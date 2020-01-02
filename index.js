// Packages
const express = require("express");
const app = express();
const cors = require("cors");

// Port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/graph", require("./Routes/Graphs"));

// Start server
app.listen(port, () => console.log(`Server started on port: ${port}`));
