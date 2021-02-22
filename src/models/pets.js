const conn = require("../infra/connetion");

class PetModel {
    create(pet, response) {
        const sql = "INSERT INTO pets SET ?"
        conn.query(sql, pet, (err, result) => {
            if(err) {
                response.status(400).json(err)
            } else {
                response.status(200).json({ id: result.insertId, ...pet})
            }
        })
    }
}

module.exports = new PetModel()