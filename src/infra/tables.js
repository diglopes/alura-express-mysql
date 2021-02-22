class Tables {
    init(conn) {
        this.conn = conn
        this.createAttendanceTable()
        this.createPetTable()
    }

    createAttendanceTable() {
        const sql = "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, data datetime NOT NULL, data_criacao datetime NOT NULL);"
        this.conn.query(sql, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Attendance table created");
            }
        })
    }

    createPetTable() {
        const sql = "CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(50), imagem varchar(200))"
        this.conn.query(sql, (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log("Pet table created");
            }
        })
    }
}

module.exports = new Tables()