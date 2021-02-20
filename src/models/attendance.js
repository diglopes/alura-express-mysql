const conn = require("../infra/connetion")

class AttendanceModel {
    create(attendance) {
        const sql = "INSERT INTO atendimentos SET ?"
        conn.query(sql, attendance, (err, response) => {
            if(err) {
                console.log(err);
            } else {
                console.log(response);
            }
        })
    }
}


module.exports = AttendanceModel
