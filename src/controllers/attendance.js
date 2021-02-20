module.exports = app => {
    app.get("/atendimentos", (req, res) => {
        res.send("Get:: rota de atendimentos")
    })
}