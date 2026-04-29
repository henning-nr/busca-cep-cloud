// ================= LOG COM HISTÓRICO =================
function adicionarLog(msg, dados = null) {
  let log = document.querySelector("#logs");

  let item = document.createElement("li");
  item.className = "collection-item log-item";
  item.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;

  if (dados) {
    item.dataset.dados = JSON.stringify(dados);
    item.style.cursor = "pointer";

    item.onclick = function () {
      restaurarBusca(JSON.parse(this.dataset.dados));
    };

    salvarHistorico(msg, dados);
  }

  log.prepend(item);
}

// ================= SALVAR HISTÓRICO =================
function salvarHistorico(msg, dados) {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.unshift({
    msg,
    dados,
    hora: new Date().toLocaleTimeString()
  });

  localStorage.setItem("historico", JSON.stringify(historico));
}

// ================= CARREGAR HISTÓRICO =================
function carregarHistorico() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];

  for (let h of historico) {
    let item = document.createElement("li");
    item.className = "collection-item log-item";
    item.innerText = `[${h.hora}] ${h.msg}`;
    item.style.cursor = "pointer";

    item.onclick = function () {
      restaurarBusca(h.dados);
    };

    document.querySelector("#logs").appendChild(item);
  }
}

// ================= RESTAURAR BUSCA =================
function restaurarBusca(dados) {
  if (dados.cep) {
    document.getElementById("cep").value = dados.cep;
    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("ddd").value = dados.ddd;
    document.getElementById("estado").value = dados.uf;

    M.updateTextFields();

    let instance = M.Tabs.getInstance(document.querySelector(".tabs"));
    instance.select("cep-tab");

    adicionarLog("Busca restaurada (CEP)");
  }

  else if (dados.tipo === "rua") {
    document.getElementById("lista-ufs").value = dados.uf;
    buscarCidades(dados.uf);

    setTimeout(() => {
      document.getElementById("lista-cidades").value = dados.cidade;
      document.getElementById("rua").value = dados.rua;

      M.updateTextFields();

      let instance = M.Tabs.getInstance(document.querySelector(".tabs"));
      instance.select("rua-tab");

      mostrarRua();
    }, 500);

    adicionarLog("Busca restaurada (Rua)");
  }
}

// ================= CEP =================
function mostrar() {
  let cep = document.getElementById("cep").value.replace(/\D/g, "");

  if (!cep) {
    alert("Digite um CEP!");
    return;
  }

  adicionarLog("Buscando CEP: " + cep);

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {
      if (dados.erro) {
        adicionarLog("CEP não encontrado");
        return;
      }

      document.getElementById("cidade").value = dados.localidade;
      document.getElementById("bairro").value = dados.bairro;
      document.getElementById("ddd").value = dados.ddd;
      document.getElementById("estado").value = dados.uf;

      M.updateTextFields();

      adicionarLog("CEP encontrado", dados); // 🔥 salva histórico
    })
    .catch(() => adicionarLog("Erro ao buscar CEP"));
}

// ================= RUA =================
function mostrarRua() {
  let uf = document.getElementById("lista-ufs").value;
  let cidade = document.getElementById("lista-cidades").value;
  let rua = document.getElementById("rua").value;

  if (!uf || !cidade || !rua) {
    alert("Preencha UF, cidade e rua!");
    return;
  }

  adicionarLog(`Buscando rua: ${rua} - ${cidade}/${uf}`);

  fetch(`https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`)
    .then(res => res.json())
    .then(ruas => {

      if (!Array.isArray(ruas) || ruas.length === 0) {
        document.querySelector("#lista-ruas").innerHTML =
          "<li class='collection-item'>Nenhum resultado</li>";
        adicionarLog("Nenhuma rua encontrada");
        return;
      }

      let lista = "";

      for (let r of ruas) {
        lista += `
          <li class="collection-item" onclick="preencherCEP('${r.cep}')">
            <strong>${r.logradouro}</strong><br>
            Bairro: ${r.bairro}<br>
            Cidade: ${r.localidade}<br>
            <span style="color:blue;font-weight:bold;">CEP: ${r.cep}</span>
          </li>
        `;
      }

      document.querySelector("#lista-ruas").innerHTML = lista;

      adicionarLog("Busca de ruas concluída", {
        tipo: "rua",
        uf,
        cidade,
        rua
      });

      confetti();
    })
    .catch(() => adicionarLog("Erro ao buscar ruas"));
}

// ================= RESTO =================
function preencherCEP(cep) {
  document.getElementById("cep").value = cep;
  M.updateTextFields();

  let instance = M.Tabs.getInstance(document.querySelector(".tabs"));
  instance.select("cep-tab");

  mostrar();
}

function buscarUFs() {
  axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => {
      let lista = '<option disabled selected>UF</option>';

      for (let uf of res.data) {
        lista += `<option value="${uf.sigla}">${uf.nome}</option>`;
      }

      document.querySelector("#lista-ufs").innerHTML = lista;
      adicionarLog("UFs carregadas");
    });
}

function buscarCidades(uf) {
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(res => res.json())
    .then(cidades => {
      let lista = '<option disabled selected>Cidade</option>';

      for (let c of cidades) {
        lista += `<option value="${c.nome}">${c.nome}</option>`;
      }

      document.querySelector("#lista-cidades").innerHTML = lista;
    });
}

function limparCampos() {
  document.querySelectorAll("input").forEach(i => i.value = "");
  document.querySelector("#lista-ruas").innerHTML = "";
  adicionarLog("Campos limpos");
  M.updateTextFields();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  M.Tabs.init(document.querySelectorAll(".tabs"));
  buscarUFs();
  carregarHistorico(); // 🔥 carrega histórico salvo
  adicionarLog("Sistema iniciado");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Erro:", err));
}