import { PRODUCT_LINKS } from "./productLinks.js";

document.addEventListener('DOMContentLoaded', () => {
  const mainView = document.getElementById('mainView');
  const cadastroView = document.getElementById('cadastroView');
  const linkProduto = document.querySelector('.link-produto');
  const formCadastro = cadastroView.querySelector('.form-cadastro');

  let presenteSelecionado = null;

  // Inicializa flags para cada presente
  const presenteFlags = {};
  document.querySelectorAll('.container-presente').forEach(el => {
    presenteFlags[el.id] = true;
  });

  function logPresenteFlags() {
    console.clear();
    console.log("=== Estado Atual dos Presentes ===");
    Object.keys(presenteFlags).forEach(id => {
      console.log(id, "=>", presenteFlags[id] ? "ativo" : "inativo");
    });
  }

  function showCadastro(id) {
    if (!id) return;
    mainView.style.display = 'none';
    cadastroView.style.display = 'block';
    presenteSelecionado = id;

    if (PRODUCT_LINKS[id]) {
      linkProduto.href = PRODUCT_LINKS[id];
      linkProduto.textContent = "Clique aqui para o link do Produto";
      linkProduto.target = "_blank";
      linkProduto.rel = "noopener noreferrer";
    } else {
      linkProduto.href = "#";
      linkProduto.removeAttribute("target");
    }

    history.replaceState({ page: "cadastro", id }, "", "#cadastro");
  }

  function showMain() {
    cadastroView.style.display = 'none';
    mainView.style.display = 'block';
    presenteSelecionado = null;

    // Atualiza visibilidade dos presentes sem resetar flags
    Object.keys(presenteFlags).forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = presenteFlags[id] ? "" : "none";
      }
    });

    logPresenteFlags();
    history.replaceState({ page: "main" }, "", "#home");
  }

  window.addEventListener('popstate', (event) => {
    if (event.state?.page === "cadastro" && event.state.id) {
      showCadastro(event.state.id);
    } else {
      showMain();
    }
  });

  // Clique nos botões de presentear
  document.body.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains('btn-presentear')) {
      const container = target.closest('.container-presente');
      const id = container?.id;
      if (id) showCadastro(id);
    }
  });

  // Submit do formulário de cadastro
  formCadastro.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!presenteSelecionado) return;

    // Marca o presente como inativo
    presenteFlags[presenteSelecionado] = false;

    formCadastro.reset();
    showMain();
  });

  // Função global para reativar presente
  window.trazerPresente = (id) => {
    if (presenteFlags[id] !== undefined) {
      presenteFlags[id] = true;
      showMain();
    }
  };

  // Inicializa tela correta
  if (location.hash === "#cadastro") {
    const lastState = history.state;
    if (lastState?.page === "cadastro" && lastState.id) {
      showCadastro(lastState.id);
    } else {
      showMain();
    }
  } else {
    showMain();
  }
});