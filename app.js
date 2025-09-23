class Local {
    constructor(nome, endereco, telefone, site = null) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.site = site;
    }

    exibirInformacoes() {
        console.log(`Nome: ${this.nome}`);
        console.log(`Endereço: ${this.endereco}`);
        console.log(`Telefone: ${this.telefone}`);
        if (this.site) console.log(`Site: ${this.site}`);
        console.log('-----------------------------');
    }

    gerarHTML() {
        let html = `<h3>${this.nome}</h3>`;
        html += `<p><strong>Endereço:</strong> ${this.endereco}</p>`;
        html += `<p><strong>Telefone:</strong> ${this.telefone}</p>`;
        if (this.site) html += `<p><strong>Site:</strong> <a href="${this.site}" target="_blank">${this.site}</a></p>`;
        html += `<hr>`;
        return html;
    }
}

class Biblioteca extends Local {}
class Sebo extends Local {}


const bibLondrina = new Biblioteca(
    "Biblioteca Municipal de Londrina",
    "Av. Rio de Janeiro, 413 - Centro, Londrina - PR",
    "(43) 3371-6500"
);

const seboCapricho = new Sebo(
    "Sebo Capricho",
    "R. Mato Grosso, 211 - Centro, Londrina - PR",
    "(43) 3324-9460",
    "https://www.sebocapricho.com.br"
);

const seboCapri = new Sebo(
    "Sebo Capricho II",
    "R. Pref. Antônio Fernandes Sobrinho, 50 - Centro, Londrina - PR",
    "(43) 3028-8581",
    "https://www.sebocapricho.com.br"
);

const seboNosso = new Sebo(
    "Sebo Nosso Sebo",
    "R. Paraíba, 205 - Jardim Higienopolis, Londrina - PR",
    "(43) 3293-0509"
);

const seboLideranca = new Sebo(
    "Sebo Liderança",
    "R. Sergipe, 1156 - Centro, Londrina - PR",
    "(43) 3037-2022"
);

const seboSolNascente = new Sebo(
    "Sebo Sol Nascente",
    "R. Gomes Carneiro, 35 - Boa Vista, Londrina - PR",
    "(43) 3025-5354"
);


const locais = [bibLondrina, seboCapricho, seboCapri, seboNosso, seboLideranca, seboSolNascente];


const container = document.getElementById("info-locais");
locais.forEach(local => {
    container.innerHTML += local.gerarHTML();
});
