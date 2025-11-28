// ----------------------------
// SISTEMA DE FAVORITOS
// ----------------------------

// Carrega favoritos do navegador
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Pega o container onde tudo será mostrado
let container = document.getElementById("info-locais");


// ----------------------------
// CLASSE LOCAL
// ----------------------------
class Local {
    constructor(nome, endereco, telefone, site = null) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.site = site;
    }

    gerarHTML() {
        // Verifica se já está favoritado
        let isFavorito = favoritos.includes(this.nome);

        let html = `<div class="local-box">`;

        html += `<h2>${this.nome}</h2>`;
        html += `<p><strong>Endereço:</strong> ${this.endereco}</p>`;
        html += `<p><strong>Telefone:</strong> ${this.telefone}</p>`;

        if (this.site)
            html += `<p><strong>Site:</strong> <a href="${this.site}" target="_blank">${this.site}</a></p>`;

        // Botão de favoritar
        html += `
            <button class="btn-favorito" onclick="toggleFavorito('${this.nome}')">
                ${isFavorito ? "★ Favorito" : "☆ Favoritar"}
            </button>
        `;

        html += `<hr></div>`;
        return html;
    }
}


// ----------------------------
// LISTA DE LOCAIS
// ----------------------------
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


// ----------------------------
// FUNÇÃO FAVORITAR / DESFAVORITAR
// ----------------------------
function toggleFavorito(nomeLocal) {
    if (favoritos.includes(nomeLocal)) {
        favoritos = favoritos.filter(item => item !== nomeLocal);
    } else {
        favoritos.push(nomeLocal);
    }

    // Atualiza localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Re-renderiza a lista
    atualizarLista();
}


// ----------------------------
// RENDERIZAR TUDO NA TELA
// ----------------------------
function atualizarLista() {
    container.innerHTML = "";
    locais.forEach(local => {
        container.innerHTML += local.gerarHTML();
    });
}


// Chamada inicial
atualizarLista();
