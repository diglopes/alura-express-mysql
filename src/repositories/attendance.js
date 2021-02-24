const query = require("../infra/database/queries")

class AttendanceRepository {
    create(attendance) {
        const sql = "INSERT INTO atendimentos SET ?";
        return query(sql, attendance)
    }

    index() {
        const sql = "SELECT * from atendimentos"
        return query(sql)
    }
}


module.exports = new AttendanceRepository()