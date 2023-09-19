const multer = require("multer");
const path = require("path");

// Configurez le stockage de fichiers avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/avatar"); // Spécifiez le répertoire de destination pour les avatars
  },
  filename: (req, file, cb) => {
    const { nom, prenom } = req.body.personalInfos[0]; // Obtenez le nom et le prénom de l'utilisateur depuis le corps de la requête
    const fileExtension = path.extname(file.originalname); // Obtenez l'extension du fichier original
    const avatarFileName = `${nom}-${prenom}${fileExtension}`; // Utilisez le nom et le prénom de l'utilisateur comme nom de fichier pour l'avatar
    req.avatarPath = `./images/avatar/${avatarFileName}`; // Stockez l'avatarPath dans la requête
    cb(null, avatarFileName);
  },
});

// Créez une instance de middleware Multer avec la configuration de stockage
const uploadAvatar = multer({ storage: storage });

module.exports = uploadAvatar;
