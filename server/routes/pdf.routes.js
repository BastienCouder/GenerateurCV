const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

//pdf
router.get("/", pdfController.readPdf);
router.post("/", pdfController.createPdf);

// ✅ export the router
module.exports = router;
