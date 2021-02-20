module.exports = app => {
    app.get("/atendimentos", (req, res) => {
        res.send("GET:: rota de atendimentos")
    })

    app.post("/atendimentos", (req, res) => {
        res.send("POST:: rota de atendimentos")
    })
}