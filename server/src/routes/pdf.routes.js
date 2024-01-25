import express from "express";
import { pdfController } from "../controllers/pdfController.js";
const router = express.Router();
// Utilisez express.Router

// pdf routes
router.post("/", pdfController.createPdf);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
