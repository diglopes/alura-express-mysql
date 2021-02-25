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

    findById(id) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id};`
        return query(sql)
    }

    update(id, attendance) {
        const sql = "UPDATE atendimentos SET ? WHERE id = ?";
        return query(sql, [attendance, id])
    }

    remove(id) {
        const sql = `DELETE FROM atendimentos WHERE id = ${id}`
        return query(sql)
    }
}


module.exports = new AttendanceRepository()