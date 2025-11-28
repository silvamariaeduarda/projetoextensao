let db;
let favoritos = []; 
let container = document.getElementById("info-locais");


function abrirBanco() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("FavoritosDB", 1);

    
        request.onupgradeneeded = function (event) {
            let db = event.target.result;

            if (!db.objectStoreNames.contains("favoritos")) {
                db.createObjectStore("favoritos", { keyPath: "nome" });
            }
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve();
        };

        request.onerror = function () {
            reject("Erro ao abrir IndexedDB");
        };
    });
}



function carregarFavoritos() {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction("favoritos", "readonly");
        let store = transaction.objectStore("favoritos");
        let request = store.getAll();

        request.onsuccess = function () {
            favoritos = request.result.map(item => item.nome);
            resolve();
        };

        request.onerror = function () {
            reject("Erro ao carregar favoritos");
        };
    });
}



function salvarFavorito(nome) {
    let transaction = db.transaction("favoritos", "readwrite");
    let store = transaction.objectStore("favoritos");

    store.put({ nome: nome });
}



function removerFavorito(nome) {
    let transaction = db.transaction("favoritos", "readwrite");
    let store = transaction.objectStore("favoritos");

    store.delete(nome);
}



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

        if (this.site)
            html += `<p><strong>Site:</strong> <a href="${this.site}" target="_blank">${this.site}</a></p>`;

        html += `
            <button class="btn-favorito" onclick="toggleFavorito('${this.nome}')">
                ${isFavorito ? "★ Favorito" : "☆ Favoritar"}
            </button>
        `;

        html += `<hr></div>`;
        return html;
    }
}



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



function toggleFavorito(nomeLocal) {
    if (favoritos.includes(nomeLocal)) {
        favoritos = favoritos.filter(f => f !== nomeLocal);
        removerFavorito(nomeLocal);
    } else {
        favoritos.push(nomeLocal);
        salvarFavorito(nomeLocal);
    }

    atualizarLista();
}



function atualizarLista() {
    container.innerHTML = "";
    locais.forEach(local => {
        container.innerHTML += local.gerarHTML();
    });
}



async function iniciar() {
    await abrirBanco();
    await carregarFavoritos();
    atualizarLista();
}

iniciar();
