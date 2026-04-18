let favoritos = [];
let container;
let usarAPI = true; // tenta usar API primeiro


// =====================
// 🔍 DETECTAR API
// =====================

async function carregarFavoritos() {
    if (usarAPI) {
        try {
            let resposta = await fetch("/favoritos");

            if (!resposta.ok) throw new Error();

            favoritos = await resposta.json();
            return;
        } catch (erro) {
            console.warn("API indisponível, usando localStorage");
            usarAPI = false;
        }
    }

    // fallback localStorage
    favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
}


// =====================
// 💾 SALVAR
// =====================

async function salvarFavorito(nome) {
    if (usarAPI) {
        try {
            await fetch("/favoritos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome })
            });
            return;
        } catch (erro) {
            usarAPI = false;
        }
    }

    // fallback localStorage
    if (!favoritos.includes(nome)) {
        favoritos.push(nome);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}


// =====================
// ❌ REMOVER
// =====================

async function removerFavorito(nome) {
    if (usarAPI) {
        try {
            await fetch(`/favoritos/${nome}`, {
                method: "DELETE"
            });
            return;
        } catch (erro) {
            usarAPI = false;
        }
    }

    // fallback localStorage
    favoritos = favoritos.filter(f => f !== nome);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


// =====================
// 📦 Classe Local
// =====================

class Local {
    constructor(nome, endereco, telefone, site = null) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.site = site;
    }

    gerarHTML() {
        let isFavorito = favoritos.includes(this.nome);

        let html = `<div class="local-box">`;

        html += `<h2>${this.nome}</h2>`;
        html += `<p><strong>Endereço:</strong> ${this.endereco}</p>`;
        html += `<p><strong>Telefone:</strong> ${this.telefone}</p>`;

        if (this.site) {
            html += `<p><strong>Site:</strong> <a href="${this.site}" target="_blank">${this.site}</a></p>`;
        }

        html += `
            <button class="btn-favorito" onclick="toggleFavorito('${this.nome}')">
                ${isFavorito ? "★ Favorito" : "☆ Favoritar"}
            </button>
        `;

        html += `<hr></div>`;
        return html;
    }
}


// =====================
// 📍 Lista de locais
// =====================

let locais = [
    new Local(
        "Biblioteca Municipal de Londrina",
        "Av. Rio de Janeiro, 413 - Centro, Londrina - PR",
        "(43) 3371-6500"
    ),
    new Local(
        "Sebo Capricho",
        "Rua Mato Grosso, 211 - Centro, Londrina - PR",
        "(43) 3324-9460",
        "https://www.sebocapricho.com.br"
    ),
    new Local(
        "Sebo Capricho II",
        "R. Pref. Antônio Fernandes Sobrinho, 50 - Centro, Londrina - PR",
        "(43) 3028-8581",
        "https://www.sebocapricho.com.br"
    ),
    new Local(
        "Sebo Nosso Sebo",
        "Rua Paraíba, 205 - Jardim Higienópolis, Londrina - PR",
        "(43) 3293-0509"
    ),
    new Local(
        "Sebo Liderança",
        "Rua Sergipe, 1156 - Centro, Londrina - PR",
        "(43) 3037-2022"
    ),
    new Local(
        "Sebo Sol Nascente",
        "Rua Gomes Carneiro, 35 - Boa Vista, Londrina - PR",
        "(43) 3025-5354"
    )
];


// =====================
// ⭐ TOGGLE
// =====================

async function toggleFavorito(nomeLocal) {
    if (favoritos.includes(nomeLocal)) {
        await removerFavorito(nomeLocal);
    } else {
        await salvarFavorito(nomeLocal);
    }

    await carregarFavoritos();
    atualizarLista();
}


// =====================
// 🔄 UI
// =====================

function atualizarLista() {
    container.innerHTML = "";

    locais.forEach(local => {
        container.innerHTML += local.gerarHTML();
    });
}


// =====================
// 🚀 INIT
// =====================

async function iniciar() {
    container = document.getElementById("info-locais");

    await carregarFavoritos();
    atualizarLista();
}

window.onload = iniciar;