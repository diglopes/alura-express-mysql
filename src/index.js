const customExpress = require("../config/customExpress")

const app = customExpress()
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})