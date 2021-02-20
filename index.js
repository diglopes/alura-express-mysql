const express = require("express")

const app = express()

const PORT = 3000

app.get("/atendimentos", (req, res) => {
    res.send("Get:: rota de atendimentos")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})