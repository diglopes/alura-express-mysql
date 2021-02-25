const customExpress = require("../config/customExpress")
const conn = require("./infra/database/connection")
const tables = require("./infra/database/tables")

const app = customExpress()
const PORT = 3000

conn.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Database connected");
        tables.init(conn)
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    }
})

