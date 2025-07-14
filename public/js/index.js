// Carregando gêneros e preencher o dropdown
async function carregarGeneros() {
    try {
        const resposta = await fetch('/api/generos');
        const generos = await resposta.json();
        const select = document.getElementById('genero_input');
        select.innerHTML = '';
        generos.forEach(genero => {
            const option = document.createElement('option');
            option.value = genero.id;
            option.textContent = genero.nome;
            select.appendChild(option);
        });
    } catch (error) {
        alert('Erro ao carregar gêneros!');
    }
}

// Validando o nome do autor
function validarNomeAutor(nome) {
    const vetor = nome.split('');
    for (let i = 0; i < vetor.length; i++) {
        const char = vetor[i];
        if (!(/[a-zA-Z\s]/.test(char))) {
            return false;
        }
    }
    return true;
}

// Calculando o preço de venda 
function calcularPrecoVenda(precoCompra, generoNome) {
    if (precoCompra >= 100 && (generoNome === "horror" || generoNome === "romance")) {
        return (precoCompra * 1.225).toFixed(2);
    }
    if (precoCompra <= 50 && (generoNome === "poesia" || generoNome === "horror")) {
        return (precoCompra * 1.25).toFixed(2);
    }
    if (precoCompra > 50 && precoCompra < 100 && generoNome === "fantasia") {
        return (precoCompra * 1.275).toFixed(2);
    }
    return precoCompra.toFixed(2);
}