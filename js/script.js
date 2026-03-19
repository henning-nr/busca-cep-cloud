// Função de buscar por CEP
function mostrar() {
    cep = document.getElementById("cep").value // pegando valor do cep
    // url = "https://viacep.com.br/ws/"+cep+"/json/; // url do viacep
    url = `https://viacep.com.br/ws/${cep}/json/` // url do viacep

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
        })
    // FIM DA IMPLEMENTAÇÃO DO FETCH
    console.log("Oi, meu CEP É fora", cep)
}
// tag fechamento do script JS

// Função de buscar por rua
function mostrarRua() {
    uf = $("#uf-rua").val()
    cidade = $("#cidade-rua").val()
    rua = $("#rua").val()

    url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/` // url do viacep

    fetch(url)
        .then((res) => { // variavel "res" irá armazenar a resposta inicial
            return res.json() // convertendo a resposta em JSON
        })
        .then((ruas) => { // variavel "cep" contendo o json com o CEP do viacep
            console.log("AQUI AS RUAS", ruas) // imprimindo os dados do cep

            let listaRuas = ""

            for (let rua of ruas) {
                dadosRua = ""

				const {ddd, siafi, localidade, regiao, unidade, ibge, estado, ...ruaNova} = rua
				delete rua.ddd 
				delete rua.siafi
				delete rua.localidade
				delete rua.regiao
				delete rua.unidade
				delete rua.ibge
				delete rua.estado

                for (let prop in rua) {
                    dadosRua = dadosRua + `<h6>${ruaNova[prop]}</h6>`
                }
                listaRuas = listaRuas + `<li class="collection-item avatar">${dadosRua}</li>`
            }

            document.querySelector("#lista-ruas").innerHTML = listaRuas
        })
}