const customExpress = require("../config/customExpress")
const conn = require("./infra/connetion")

const app = customExpress()
const PORT = 3000

conn.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    }
})

