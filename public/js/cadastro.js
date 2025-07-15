document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formLivro');
  const generoSelect = document.getElementById('genero_id');
  const listaLivros = document.getElementById('listaLivros');

  fetch('/api/generos')
    .then(res => res.json())
    .then(data => {
      data.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.text = g.nome;
        generoSelect.appendChild(opt);
      });
    });

  function autorValido(autor) {
    const caracteres = autor.split('');
    for (let i = 0; i < caracteres.length; i++) {
      if (!/[A-Za-zÀ-ú\s]/.test(caracteres[i])) {
        return false;
      }
    }
    return true;
  }

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

  function carregarLivros() {
    listaLivros.innerHTML = '';
    fetch('/api/livros')
      .then(res => res.json())
      .then(data => {
        data.forEach(livro => {
          const li = document.createElement('li');
          li.textContent = `${livro.titulo} - ${livro.autor} - R$ ${livro.preco_venda} - ${livro.genero_nome} - ${livro.quantidade} un.`;
          listaLivros.appendChild(li);
        });
      });
  }

  carregarLivros();
});