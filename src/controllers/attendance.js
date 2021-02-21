const AttendanceModel = require("../models/attendance")

module.exports = app => {
    app.get("/atendimentos", (req, res) => {
        res.send("GET:: rota de atendimentos")
    })

    app.post("/atendimentos", (req, res) => {
        const attendance = req.body
        const attendanceModel = new AttendanceModel()
        attendanceModel.create(attendance, res)
    })
}