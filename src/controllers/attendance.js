const attendanceModel = require("../models/attendance")

module.exports = app => {
    app.get("/atendimentos", (req, res) => {
        attendanceModel.index(res)
    })

    app.get("/atendimentos/:id", (req, res) => {
        const { id } = req.params
        attendanceModel.findById(id, res)
    })

    app.post("/atendimentos", (req, res) => {
        const attendance = req.body
        attendanceModel.create(attendance, res)
    })
}