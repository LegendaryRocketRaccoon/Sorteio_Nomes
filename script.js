let nomesIniciais = Array.from(document.querySelectorAll("#lista-nomes li")).map(el => el.textContent);
let nomes = [...nomesIniciais];

function atualizarLista() {
  const lista = document.getElementById("lista-nomes");
  lista.innerHTML = "";
  nomesIniciais.forEach(nome => {
    const li = document.createElement("li");
    li.textContent = nome;
    lista.appendChild(li);
  });
}

function adicionarNome() {
  const novoNome = document.getElementById("novoNome").value.trim();
  if (novoNome) {
    nomesIniciais.push(novoNome);
    nomes.push(novoNome);
    atualizarLista();
    document.getElementById("novoNome").value = "";
    document.getElementById("mensagem").innerText = Nome `${novoNome} adicionado`;
  } else {
    document.getElementById("mensagem").innerText = "Por favor, digite um nome válido.";
  }
}

function sortearNome() {
  if (nomes.length === 0) {
    document.getElementById("mensagem").innerText = "Todos os nomes já foram sorteados!";
    return;
  }

  const indiceSorteado = Math.floor(Math.random() * nomes.length);
  const nomeSorteado = nomes.splice(indiceSorteado, 1)[0];

  document.getElementById("resultado").innerText = nomeSorteado;
  document.getElementById("mensagem").innerText = `${nomes.length} nome(s) restante(s).`;
}

function resetarSorteio() {
  nomes = [...nomesIniciais];
  document.getElementById("resultado").innerText = "";
  document.getElementById("mensagem").innerText = "Sorteio reiniciado!";
}

// Adicionando event listeners após carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnAdicionar").addEventListener("click", adicionarNome);
  document.getElementById("btnSortear").addEventListener("click", sortearNome);
  document.getElementById("btnResetar").addEventListener("click", resetarSorteio);
});