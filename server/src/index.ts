import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import { connectDB } from "@/config/db";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
// Connexion à la DB
connectDB();

const app: Express = express();
const server = http.createServer(app);

// Middleware
app.use(express.json()); // Pour gérer les données JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

// Définir les options de CORS
const clientUrl = process.env.CLIENT_URL!; // Fournir une valeur par défaut si CLIENT_URL n'est pas défini
const corsOptions = {
  origin: [clientUrl], // Maintenant, ce sera toujours un tableau de strings
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/pdf", require("./routes/pdf.routes"));

// Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Le serveur a démarré au port " + PORT));
