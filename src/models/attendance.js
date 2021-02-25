const moment = require("moment");
const axios = require("axios")
const conn = require("../infra/database/connection");
const attendanceRepository = require("../repositories/attendance")

const dateMask = "YYYY-MM-DD HH:mm:ss";

class AttendanceModel {
  constructor() {
    this.isDateValid = ({ date, createdAt }) => moment(date).isSameOrAfter(createdAt);
    this.isClientValid = ({ length }) => length >= 5;
    this.validations = [
      {
        field: "data",
        message: "A data deve ser maior ou igual a data atual",
        valid: this.isDateValid,
      },
      {
        field: "cliente",
        message: "Cliente deve ter ao menos 5 caracteres",
        valid: this.isClientValid,
      },
    ];
  }

  _validate(params) {
    return this.validations.filter(({ field, valid }) => {
      return params[field] && !valid(params[field])
    })
  }

  _formatDate(date) {
    return moment(date, "DD/MM/YYYY").format(
      dateMask
    );
  }

  _getCurrentTimestamp() {
    return moment().format(dateMask);
  }

  create(attendance) {
    const createdAt = this._getCurrentTimestamp()
    const date = this._formatDate(attendance.data)
    const validationParams = {
      data: { date, createdAt },
      cliente: { length: attendance.cliente.length }
    }
    const errors = this._validate(validationParams)
    const errorFound = errors.length;
    if (errorFound) {
       return Promise.reject(errors)
    } else {
      const composedAttendance = {
        ...attendance,
        data_criacao: createdAt,
        data: date,
      };
      return attendanceRepository
        .create(composedAttendance)
        .then((result) => {
          return { id: result.insertId, ...composedAttendance}
        })
    }
  }

  index() {
    return attendanceRepository.index()
  }

  findById(id) {
    let attendance;
    return attendanceRepository
      .findById(id)
      .then(result => {
        attendance = result[0]
        const cpf = attendance.cliente
        const client = axios.get(`http://localhost:8082/${cpf}`)
        return client
      })
      .then(({ data }) => {
        return {
          client: data,
          ...attendance
        }
      })
  }

  
  update(id, attendance) {
    const validationParams = {}
    if(attendance.data) {
      const date = this._formatDate(attendance.data);
      const createdAt = this._getCurrentTimestamp()
      validationParams.data = { date, createdAt }
    }
    if(attendance.cliente) {
      validationParams.cliente = { length: attendance.cliente.length } 
    }
    const shouldValidate = Object.keys(validationParams).length > 0
    if(shouldValidate) {
      const errors = this._validate(validationParams)
      const errorFound = errors.length;
      if (errorFound) return Promise.reject(errors)
    }
    return attendanceRepository
      .update(id, attendance)
      .then(() => ({ id, ...attendance }))
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
