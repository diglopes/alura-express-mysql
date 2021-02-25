const express = require("express")
const faker = require("faker")

const app = express()

app.use(express.json())

app.get("/:cpf", (req, res) => {
    const { cpf } = req.params

    res.status(200).json({
        cpf,
        nome: faker.name.findName(),
        dataNascimento:  faker.date.past()
    })
})

app.listen(8082, () => console.log("User service running"))