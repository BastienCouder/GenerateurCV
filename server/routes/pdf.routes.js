const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");
const uploadAvatar = require("../middlewares/avatar.middleware");

//pdf
router.get("/", pdfController.readPdf);
router.post("/", uploadAvatar.single("avatar"), pdfController.createPdf);

// ✅ export the router
module.exports = router;
