import { PRODUCT_LINKS } from "./src/productLinks.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs9LdN3M8Ey8ta5BroO9uL71CstOk2Mso",
  authDomain: "presentes-16527.firebaseapp.com",
  projectId: "presentes-16527",
  storageBucket: "presentes-16527.appspot.com",
  messagingSenderId: "972822375721",
  appId: "1:972822375721:web:cd9c073c0310dc12d99b38"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', async () => {
  const mainView = document.getElementById('mainView');
  const cadastroView = document.getElementById('cadastroView');
  const linkProduto = document.querySelector('.link-produto');
  const formCadastro = cadastroView.querySelector('.form-cadastro');

  let presenteSelecionado = null;

  // Inicializa flags de todos os presentes
  const presenteFlags = {};
  document.querySelectorAll('.container-presente').forEach(el => {
    presenteFlags[el.id] = true;
  });

  // --- Busca presentes já escolhidos no Firebase ---
  try {
    const snapshot = await db.collection("presentes").get();
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.presenteId && presenteFlags[data.presenteId] !== undefined) {
        presenteFlags[data.presenteId] = false; // Marca como já escolhido
      }
    });
  } catch (error) {
    console.error("Erro ao buscar presentes no Firebase:", error);
  }

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

    // Agora usamos pushState para permitir voltar
    history.pushState({ page: "cadastro", id }, "", "#cadastro");
  }

  function showMain(push = true) {
    cadastroView.style.display = 'none';
    mainView.style.display = 'block';
    presenteSelecionado = null;

    // Mostra apenas presentes ativos
    Object.keys(presenteFlags).forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        container.style.display = presenteFlags[id] ? "" : "none";
      }
    });

    logPresenteFlags();

    // Atualiza histórico somente se push = true
    if (push) history.pushState({ page: "main" }, "", "#home");
  }

  // Ouve mudanças no botão voltar do navegador
  window.addEventListener('popstate', (event) => {
    if (event.state?.page === "cadastro" && event.state.id) {
      showCadastro(event.state.id);
    } else {
      showMain(false); // não push, apenas exibe
    }
  });

  document.body.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains('btn-presentear')) {
      const container = target.closest('.container-presente');
      const id = container?.id;
      if (id) showCadastro(id);
    }
  });

  formCadastro.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!presenteSelecionado) return;

    const nome = formCadastro.querySelector('input[name="nome"]').value;
    const sobrenome = formCadastro.querySelector('input[name="sobrenome"]').value;
    const telefone = formCadastro.querySelector('input[name="telefone"]').value;

    db.collection("presentes").add({
      presenteId: presenteSelecionado,
      nome,
      sobrenome,
      telefone,
      data: new Date()
    }).then(() => {
      console.log("Presente salvo com sucesso!");
      presenteFlags[presenteSelecionado] = false;
      formCadastro.reset();
      showMain();
    }).catch((error) => {
      console.error("Erro ao salvar no Firebase:", error);
    });
  });

  window.trazerPresente = (id) => {
    if (presenteFlags[id] !== undefined) {
      presenteFlags[id] = true;
      showMain();
    }
  };

  // Inicializa tela de acordo com o hash
  if (location.hash === "#cadastro") {
    const lastState = history.state;
    if (lastState?.page === "cadastro" && lastState.id) {
      showCadastro(lastState.id);
    } else {
      showMain(false);
    }
  } else {
    showMain(false);
  }
});