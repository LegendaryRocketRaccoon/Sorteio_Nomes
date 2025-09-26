let nomesIniciais = Array.from(document.querySelectorAll("#lista-nomes li")).map(el => el.textContent);
let nomes = [...nomesIniciais];

const imagens = {
  "Bruno": "Bruno.jpeg",
  "Gustavo Chimello (Legendary Rocket Raccoon)": "Gustavo.jpeg",
  "Olavo Xavier (The True Gamer)": "Olavo.jpeg",
  "Kaio (Meu Chapéu)": "Kaio.jpg"
};

const countdownDiv = document.getElementById("countdown");
const resultadoContainer = document.getElementById("resultado-container");
const circle = document.getElementById("circle");
const inicial = document.getElementById("inicial");
const foto = document.getElementById("foto");
const resultado = document.getElementById("resultado");

const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.style.cssText = `
  position: fixed; top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.95);
  display: none; flex-direction: column; justify-content:center; align-items:center;
  z-index: 9999; text-align:center;
`;
document.body.appendChild(overlay);
overlay.appendChild(countdownDiv);
overlay.appendChild(resultadoContainer);

const btnFechar = document.createElement("button");
btnFechar.innerText = "Fechar";
btnFechar.style.cssText = `
  margin-top: 20px; padding: 12px 20px; font-size: 1.2em;
  background:#00f7ff; border:none; border-radius:30px; cursor:pointer;
  font-weight:bold; color:#000; box-shadow:0 0 15px #00f7ff;
`;
btnFechar.onclick = () => {
  overlay.style.display = "none";
  resetarVisual();
};
overlay.appendChild(btnFechar);

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
    document.getElementById("mensagem").innerText = `Nome "${novoNome}" adicionado`;
  } else {
    document.getElementById("mensagem").innerText = "Por favor, digite um nome válido.";
  }
}

function sortearNome() {
  if (nomes.length === 0) {
    document.getElementById("mensagem").innerText = "Todos os nomes já foram sorteados.";
    return;
  }

  overlay.style.display = "flex";
  resultadoContainer.classList.add("hidden");
  let countdown = 3;
  countdownDiv.textContent = countdown;

  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownDiv.textContent = countdown;
    } else {
      clearInterval(timer);
      countdownDiv.textContent = "Pessoa Sorteada:";

      const indiceSorteado = Math.floor(Math.random() * nomes.length);
      const nomeSorteado = nomes.splice(indiceSorteado, 1)[0];

      foto.classList.add("hidden");
      inicial.textContent = "";

      if (imagens[nomeSorteado]) {
        foto.src = imagens[nomeSorteado];
        foto.classList.remove("hidden");
      } else {
        inicial.textContent = nomeSorteado[0].toUpperCase();
      }

      resultado.innerText = nomeSorteado;
      resultadoContainer.classList.remove("hidden");
      document.getElementById("mensagem").innerText = `${nomes.length} nome(s) restante(s).`;
    }
  }, 1000);
}

function resetarVisual() {
  countdownDiv.textContent = "";
  resultado.innerText = "";
  resultadoContainer.classList.add("hidden");
}

function resetarSorteio() {
  nomes = [...nomesIniciais];
  document.getElementById("mensagem").innerText = "Sorteio reiniciado.";
  resetarVisual();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnAdicionar").addEventListener("click", adicionarNome);
  document.getElementById("btnSortear").addEventListener("click", sortearNome);
  document.getElementById("btnResetar").addEventListener("click", resetarSorteio);
});

