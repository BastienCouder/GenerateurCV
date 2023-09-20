const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http");
const connectDB = require("./config/db");
const cors = require("cors");

// Connexion à la DB

connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json()); // Pour gérer les données JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/pdf", require("./routes/pdf.routes"));

// Launch the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Le serveur a démarré au port " + PORT));
