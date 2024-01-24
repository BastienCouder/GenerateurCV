import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdf.routes"; // Assurez-vous que le chemin est correct

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

// Définir les options de CORS
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000"; // Valeur par défaut si CLIENT_URL n'est pas défini
const corsOptions = {
  origin: [clientUrl], // Utilisation de clientUrl
  credentials: true,
};

app.use(cors(corsOptions));

// Utilisation des routes PDF
app.use("/pdf", pdfRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Le serveur a démarré au port ${PORT}`));
