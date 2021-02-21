const moment = require("moment")
const conn = require("../infra/connetion")

class AttendanceModel {
    create(attendance, response) {
        const dateMask = "YYYY-MM-DD HH:mm:ss"
        const createdAt = moment().format(dateMask)
        const normalizedDate = moment(attendance.data, "DD/MM/YYYY").format(dateMask)
        const sql = "INSERT INTO atendimentos SET ?"
        const composedAttendance = {
            ...attendance,
            data_criacao: createdAt,
            data: normalizedDate,
        }
        
        conn.query(sql, composedAttendance, (err, result) => {
            if(err) {
                response.status(400).json(err)
            } else {
                response.status(201).json(result)
            }
        })
    }
}


module.exports = AttendanceModel
