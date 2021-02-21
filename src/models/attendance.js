const moment = require("moment")
const conn = require("../infra/connetion")

class AttendanceModel {
    create(attendance) {
        const dateMask = "YYYY-MM-DD HH:mm:ss"
        const createdAt = moment().format(dateMask)
        const normalizedDate = moment(attendance.data, "DD/MM/YYYY").format(dateMask)
        const sql = "INSERT INTO atendimentos SET ?"
        const composedAttendance = {
            ...attendance,
            data_criacao: createdAt,
            data: normalizedDate,
        }
        
        conn.query(sql, composedAttendance, (err, response) => {
            if(err) {
                console.log(err);
            } else {
                console.log(response);
            }
        })
    }
}


module.exports = AttendanceModel
