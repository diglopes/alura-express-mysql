const moment = require("moment");
const conn = require("../infra/connetion");
const dateMask = "YYYY-MM-DD HH:mm:ss";

class AttendanceModel {
  create(attendance, response) {
    const createdAt = moment().format(dateMask);
    const normalizedDate = moment(attendance.data, "DD/MM/YYYY").format(
      dateMask
    );

    const isDateValid = moment(normalizedDate).isSameOrAfter(createdAt);
    const isClientValid = attendance.cliente.length >= 5;
    const validations = [
      {
        field: "data",
        message: "A data deve ser maior ou igual a data atual",
        valid: isDateValid,
      },
      {
        field: "cliente",
        message: "Cliente deve ter ao menos 5 caracteres",
        valid: isClientValid,
      },
    ];
    const errors = validations.filter((field) => !field.valid);
    const errorFound = errors.length;

    if (errorFound) {
        response.status(400).json(errors)
    } else {
      const sql = "INSERT INTO atendimentos SET ?";
      const composedAttendance = {
        ...attendance,
        data_criacao: createdAt,
        data: normalizedDate,
      };

      conn.query(sql, composedAttendance, (err, result) => {
        if (err) {
          response.status(400).json(err);
        } else {
          response.status(201).json({ id: result.insertId, ...composedAttendance});
        }
      });
    }
  }

  index(response) {
    const sql = "SELECT * from atendimentos;"
    conn.query(sql, (err, result) => {
      if(err) {
        response.status(400).json(err)
      } else {
        response.status(200).json(result)
      }
    })
  }

  findById(id, response) {
    const sql = `SELECT * FROM atendimentos WHERE id = ${id};`
    conn.query(sql, (err, result) => {
      const attendance = result[0]
      if(err) {
        response.status(400).json(err)
      } else if (attendance) {
        response.status(200).json(attendance)
      } else {
        response.status(404).json({ message: "Atendimento não encontrado" })
      }
    })
  }

  update(id, attendance, response) {
    if(attendance.data) {
      attendance.data =  moment(attendance.data, "DD/MM/YYYY").format(
        dateMask
      );
    }
    const sql = "UPDATE atendimentos SET ? WHERE id = ?";
    conn.query(sql, [attendance, id], (err, result) => {
      if(err) {
        response.status(400).json(err)
      } else {
        response.status(200).json(result)
      }
    })
  }

  remove(id, response) {
    const sql = `DELETE FROM atendimentos WHERE id = ${id}`
    conn.query(sql, (err, result) => {
      if(err) {
        response.status(400).json(err)
      } else {
        response.status(200).json({ id, message: "Agendamento removido"})
      }
    })
  }
}

module.exports = new AttendanceModel();
