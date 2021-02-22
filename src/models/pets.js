const conn = require("../infra/connetion");
const fileUpload = require("../files/file-upload");

class PetsModel {
  create(pet, response) {
    const sql = "INSERT INTO pets SET ?";
    const fileUploadCallback = (err, imagePath) => {
      if (err) {
          response.status(400).json({ message: err.message })
      } else {
        const newPet = {
          ...pet,
          imagem: imagePath,
        };
        conn.query(sql, newPet, (err, result) => {
          if (err) {
            response.status(400).json(err);
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
