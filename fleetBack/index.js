const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fleetRoutes = require("./routes/fleetRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require('./routes/protectedRoutes');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", fleetRoutes);
app.use("/api", authRoutes);
app.use('/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));