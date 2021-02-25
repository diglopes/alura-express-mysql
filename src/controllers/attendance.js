const attendanceModel = require("../models/attendance")

module.exports = app => {
    app.get("/atendimentos", (req, res) => {
        attendanceModel
          .index()
          .then(attendance => {
              res.json(attendance)
          })
          .catch(error => {
              res.status(400).json(error)
          })
    })

    app.get("/atendimentos/:id", (req, res) => {
        const { id } = req.params
        attendanceModel
          .findById(id)
          .then(result => res.json(result))
          .catch(error => res.status(400).json(error))
    })

    app.post("/atendimentos", (req, res) => {
        const attendance = req.body
        attendanceModel.create(attendance)
          .then(registeredAttendance => {
            res.status(201).json(registeredAttendance)
          })
          .catch(error => {
            res.status(400).json(error)
          })
    })

    app.patch("/atendimentos/:id", (req, res) => {
        const { id } = req.params
        const attendance = req.body
        attendanceModel
          .update(id, attendance)
          .then(result => res.json(result))
          .catch(error => res.status(400).json(error))
    })

    app.delete("/atendimentos/:id", (req, res) => {
        const { id } = req.params
        attendanceModel.remove(id, res)
    })
}