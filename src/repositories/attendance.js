const query = require("../infra/database/queries")

class AttendanceRepository {
    create(attendance) {
        const sql = "INSERT INTO atendimentos SET ?";
        return query(sql, attendance)
    }
}


module.exports = new AttendanceRepository()