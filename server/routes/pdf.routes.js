const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");
const upload = require("../middlewares/avatar.middleware");

//pdf
router.get("/", pdfController.readPdf);
router.post("/", upload, pdfController.createPdf);

// ✅ export the router
module.exports = router;
