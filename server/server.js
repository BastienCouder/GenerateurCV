const express = require("express");
const dotenv = require("dotenv").config();
const http = require("http");
const connectDB = require("./config/db");
const cors = require("cors");

// Connexion à la DB

connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
