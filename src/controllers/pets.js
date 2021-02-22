const petModel = require("../models/pets")

module.exports = app => {
    app.post("/pets", (req, res) => {
        const pet = req.body
        petModel.create(pet, res)
    })
}