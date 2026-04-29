const appLogs = []

function addLog(message, type = 'info') {
    const now = new Date()
    const time = now.toLocaleTimeString('pt-BR', { hour12: false })
    appLogs.unshift({ time, message, type })
}

function renderLogs() {
    const logContainer = document.querySelector('#resultado-log')
    if (!logContainer) {
        return
    }

    if (appLogs.length === 0) {
        logContainer.innerHTML = '<li class="collection-item">Nenhuma ocorrência registrada.</li>'
        return
    }

    logContainer.innerHTML = appLogs
        .map((item) => {
            const statusClass = item.type === 'error'
                ? 'red-text text-darken-2'
                : item.type === 'success'
                    ? 'green-text text-darken-2'
                    : ''

            return `<li class="collection-item ${statusClass}">` +
                `<span class="title"><strong>[${item.time}]</strong></span>` +
                `<p>${item.message}</p>` +
                `</li>`
        })
        .join('')
}

function mostrarLog() {
    renderLogs()
}

function limparLog() {
    appLogs.length = 0
    renderLogs()
}

// Função de buscar por CEP
function mostrar() {
    const cep = document.getElementById("cep").value // pegando valor do cep
    // url = "https://viacep.com.br/ws/"+cep+"/json/; // url do viacep
    const url = `https://viacep.com.br/ws/${cep}/json/` // url do viacep

    // BUSCANDO O CEP USANDO FETCH
    fetch(url)
        .then((res) => { // variavel "res" irá armazenar a resposta inicial
            return res.json() // convertendo a resposta em JSON
        })
        .then((cep) => { // variavel "cep" contendo o json com o CEP do viacep
            console.log("Oi, meu CEP É no fetch", cep) // imprimindo os dados do cep
            document.getElementById("cidade").value = cep.localidade
            document.getElementById("bairro").value = cep.bairro
            document.getElementById("ddd").value = cep.ddd
            document.getElementById("estado").value = cep.uf
            M.updateTextFields()
            addLog(`Busca de CEP realizada: ${cep.cep} → ${cep.localidade}, ${cep.uf}`, 'success')
        })
        .catch((error) => {
            console.error('Erro ao buscar CEP:', error)
            addLog(`Erro na consulta de CEP ${cep}: ${error.message || error}`, 'error')
        })
    // FIM DA IMPLEMENTAÇÃO DO FETCH
    console.log("Oi, meu CEP É fora", cep)
}
// tag fechamento do script JS

// Função de buscar por rua
function mostrarRua() {
    const uf = $("#lista-ufs").val()
    const cidade = $("#lista-cidades").val()
    const rua = $("#lista-ruas").val()

    if (!uf || !cidade || !rua) {
        return
    }

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`

    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((ruas) => {
            console.log("AQUI AS RUAS", ruas)

            let listaRuas = ""

            for (let ruaItem of ruas) {
                let dadosRua = ""
                const { ddd, siafi, localidade, regiao, unidade, ibge, estado, ...ruaNova } = ruaItem

                for (let prop in ruaNova) {
                    dadosRua += `<h6>${ruaNova[prop]}</h6>`
                }
                listaRuas += `<li class="collection-item avatar">${dadosRua}</li>`
            }

            document.querySelector("#resultado-ruas").innerHTML = listaRuas
            addLog(`Detalhes da rua "${rua}" consultados em ${cidade}/${uf} - ${Array.isArray(ruas) ? ruas.length : 0} ocorrências`, 'success')
        })
        .catch((error) => {
            console.error("Erro ao buscar rua:", error)
            document.querySelector("#resultado-ruas").innerHTML = '<li class="collection-item">Erro ao buscar ruas.</li>'
            addLog(`Erro na consulta de rua ${rua} em ${cidade}/${uf}: ${error.message || error}`, 'error')
        })
}


function buscarUFs() {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

    let listaUfs = '<option value="" disabled selected>Escolha uma UF</option>'

    axios.get(url) // AXIOS
        .then((ufs) => {
            console.log("com axios", ufs.data)
            for (let uf of ufs.data) {
                listaUfs += `<option value="${uf.sigla}">${uf.nome}</option>`
            }
            document.querySelector("#lista-ufs").innerHTML = listaUfs
            addLog(`UFs carregadas: ${ufs.data.length}`, 'info')
        })
        .catch((error) => {
            console.error('Erro ao carregar UFs:', error)
            addLog(`Erro ao carregar UFs: ${error.message || error}`, 'error')
        })
}

buscarUFs()
renderLogs()

function buscarCidades(uf) {

    console.log("sigla", uf)
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`

    let listaCidades = '<option value="" disabled selected>Escolha uma Cidade</option>'

    $.get(url, (cidades) => { //AJAX

        for (let cidade of cidades) {
            listaCidades += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }
        document.querySelector("#lista-cidades").innerHTML = listaCidades
        document.querySelector("#lista-ruas").value = ''
        addLog(`Cidades carregadas para UF ${uf}: ${cidades.length}`, 'info')
    }).fail((error) => {
        console.error('Erro ao carregar cidades:', error)
        addLog(`Erro ao carregar cidades para UF ${uf}: ${error.statusText || error}`, 'error')
    })
}

// Registrar o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => {
                console.log('Service Worker registrado com sucesso!', reg);
                addLog('Service Worker registrado (PWA ativo)', 'success');
            })
            .catch(err => {
                console.error('Erro ao registrar Service Worker:', err);
                addLog('Erro ao registrar Service Worker (PWA inativo)', 'error');
            });
    });
}

