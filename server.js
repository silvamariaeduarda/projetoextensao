const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir seus arquivos HTML/CSS/JS
app.use(express.static(__dirname));

// "Banco" simples
let favoritos = [];

// ROTAS API
app.get("/favoritos", (req, res) => {
    res.json(favoritos);
});

app.post("/favoritos", (req, res) => {
    const { nome } = req.body;

    if (!favoritos.includes(nome)) {
        favoritos.push(nome);
    }

    res.json({ sucesso: true });
});

app.delete("/favoritos/:nome", (req, res) => {
    const nome = req.params.nome;
    favoritos = favoritos.filter(f => f !== nome);
    res.json({ sucesso: true });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000");
});