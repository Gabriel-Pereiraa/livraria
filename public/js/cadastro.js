document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formLivro');
  const generoSelect = document.getElementById('genero_id');
  const listaLivros = document.getElementById('listaLivros');

  // Carrega os gêneros no dropdown
  function carregarGeneros() {
    fetch('/api/generos')
      .then(res => res.json())
      .then(generos => {
        generoSelect.innerHTML = '';
        generos.forEach(g => {
          const opt = document.createElement('option');
          opt.value = g.id;
          opt.text = g.nome;
          generoSelect.appendChild(opt);
        });
      });
  }

  // Validação do nome do autor (apenas letras e espaço)
  function autorValido(autor) {
    const caracteres = autor.split('');
    for (let i = 0; i < caracteres.length; i++) {
      const codigo = caracteres[i].charCodeAt(0);
      if (
        !(codigo === 32 || // espaço
          (codigo >= 65 && codigo <= 90) || // A-Z
          (codigo >= 97 && codigo <= 122) || // a-z
          (codigo >= 192 && codigo <= 255)) // letras acentuadas
      ) {
        return false;
      }
    }
    return true;
  }

  // Envia o livro para o backend
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const autor = document.getElementById('autor').value;
    if (!autorValido(autor)) {
      alert('Autor inválido! Não use números ou caracteres especiais.');
      return;
    }

    const livro = {
      titulo: document.getElementById('titulo').value,
      autor,
      preco_compra: parseFloat(document.getElementById('preco_compra').value),
      quantidade: parseInt(document.getElementById('quantidade').value),
      genero_id: parseInt(document.getElementById('genero_id').value)
    };

    fetch('/api/livros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livro)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.mensagem || data.erro);
        form.reset();
        carregarLivros();
      });
  });

  // Carrega e exibe todos os livros cadastrados
  function carregarLivros() {
    listaLivros.innerHTML = '';
    fetch('/api/livros')
      .then(res => res.json())
      .then(livros => {
        livros.forEach(livro => {
          const li = document.createElement('li');
          li.textContent = `${livro.titulo} - ${livro.autor} - R$ ${livro.preco_venda} - ${livro.genero_nome} - ${livro.quantidade} un.`;
          listaLivros.appendChild(li);
        });
      });
  }

  // Inicialização
  carregarGeneros();
  carregarLivros();
});