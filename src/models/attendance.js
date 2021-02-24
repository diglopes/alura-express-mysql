const moment = require("moment");
const axios = require("axios")
const conn = require("../infra/database/connection");
const attendanceRepository = require("../repositories/attendance")

const dateMask = "YYYY-MM-DD HH:mm:ss";

class AttendanceModel {
  create(attendance) {
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
       return Promise.reject(errors)
    } else {
      const composedAttendance = {
        ...attendance,
        data_criacao: createdAt,
        data: normalizedDate,
      };
      return attendanceRepository
        .create(composedAttendance)
        .then((result) => {
          return { id: result.insertId, ...composedAttendance}
        })
    }
  }

  index(response) {
    const sql = "SELECT * from atendimentos;"
    conn.query(sql, (error, result) => {
      if(error) {
        response.status(400).json(error)
      } else {
        response.status(200).json(result)
      }
    })
  }

  findById(id, response) {
    const sql = `SELECT * FROM atendimentos WHERE id = ${id};`
    conn.query(sql, async (error, result) => {
      const attendance = result[0]
      const cpf = attendance.cliente
      if(error) {
        response.status(400).json(error)
      } else if (attendance) {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        attendance.cliente = data
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
    conn.query(sql, [attendance, id], (error, result) => {
      if(error) {
        response.status(400).json(error)
      } else {
        response.status(200).json({ id, ...attendance})
      }
    })
  }

  remove(id, response) {
    const sql = `DELETE FROM atendimentos WHERE id = ${id}`
    conn.query(sql, (error, result) => {
      if(error) {
        response.status(400).json(error)
      } else {
        response.status(200).json({ id, message: "Agendamento removido"})
      }
    })
  }
}

module.exports = new AttendanceModel();
