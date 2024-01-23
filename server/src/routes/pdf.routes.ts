import express from "express";
import { pdfController } from "@/controllers/pdfController";

// Utilisez express.Router
const router = express.Router();

// pdf routes
router.get("/", pdfController.readPdf);
router.post("/", pdfController.createPdf);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
