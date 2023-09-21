const path = require("path");
const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: "images/avatar",
  filename: function (req, file, callback) {
    callback(
      null,
      "avatar" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, callback) => {
  let pattern = /jpg|jpeg|/; // reqex

  if (pattern.test(path.extname(file.originalname))) {
    callback(null, true);
  } else {
    callback("Error: not a valid file");
  }
};
const upload = multer({
  storage: storageEngine,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 Mo
  },
}).single("personalInfos[0][avatar]");

module.exports = upload;
