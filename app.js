async function carregarFavoritos() {
    let resposta = await fetch("/favoritos");
    favoritos = await resposta.json();
}

async function salvarFavorito(nome) {
    await fetch("/favoritos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome })
    });
}

async function removerFavorito(nome) {
    await fetch(`/favoritos/${nome}`, {
        method: "DELETE"
    });
}

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