const conn = require("../infra/database/connection");
const fileUpload = require("../infra/files/file-upload");

class PetsModel {
  create(pet, response) {
    const sql = "INSERT INTO pets SET ?";
    const fileUploadCallback = (error, imagePath) => {
      if (error) {
          response.status(400).json({ message: error.message })
      } else {
        const newPet = {
          ...pet,
          imagem: imagePath,
        };
        conn.query(sql, newPet, (error, result) => {
          if (error) {
            response.status(400).json(error);
          } else {
            response.status(200).json({ id: result.insertId, ...newPet });
          }
        });
      }
    };
    fileUpload(pet.imagem, pet.nome, fileUploadCallback);
  }
}

module.exports = new PetsModel();
