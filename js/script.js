// ==========================
// BUSCA POR CEP
// ==========================
function mostrar() {
	let cep = document.getElementById("cep").value

	let url = `https://viacep.com.br/ws/${cep}/json/`

	fetch(url)
		.then((res) => res.json())
		.then((dados) => {
			console.log("CEP:", dados)

			if (dados.erro) {
				alert("CEP não encontrado!")
				return
			}

			document.getElementById("cidade").value = dados.localidade
			document.getElementById("bairro").value = dados.bairro
			document.getElementById("ddd").value = dados.ddd
			document.getElementById("estado").value = dados.uf

			M.updateTextFields()
		})
		.catch((err) => {
			console.log("Erro:", err)
			alert("Erro ao buscar CEP")
		})
}

// ==========================
// BUSCA POR RUA
// ==========================
function mostrarRua() {
	let uf = document.getElementById("uf-rua").value
	let cidade = document.getElementById("cidade-rua").value
	let rua = document.getElementById("rua").value

	if (!uf || !cidade || !rua) {
		alert("Preencha todos os campos!")
		return
	}

	cidade = encodeURIComponent(cidade)
	rua = encodeURIComponent(rua)

	let url = `https://viacep.com.br/ws/${uf}/${cidade}/${rua}/json/`

	let lista = document.getElementById("lista-ruas")

	// LOADING
	lista.innerHTML = `
	  <li class="collection-item center-align">
	    <div class="preloader-wrapper active">
	      <div class="spinner-layer spinner-blue-only">
	        <div class="circle-clipper left"><div class="circle"></div></div>
	        <div class="gap-patch"><div class="circle"></div></div>
	        <div class="circle-clipper right"><div class="circle"></div></div>
	      </div>
	    </div>
	    <p>Carregando...</p>
	  </li>
	`

	fetch(url)
		.then((res) => res.json())
		.then((ruas) => {
			console.log("RUAS:", ruas)

			if (ruas.erro || ruas.length === 0) {
				lista.innerHTML = `
					<li class="collection-item red-text">
						Nenhum resultado encontrado
					</li>
				`
				return
			}

			let html = ""
		
			ruas.forEach((item) => {
				html += `
					<li class="collection-item avatar">

						<i class="material-icons circle red">location_on</i>

						<span class="title"><strong>${item.logradouro}</strong></span>

						<p>
							CEP: ${item.cep} <br>
							Bairro: ${item.bairro} <br>
							Cidade: ${item.localidade} <br>
							Estado: ${item.estado} ${item.uf}
						</p>

						<a href="#!" class="secondary-content">
							<i class="material-icons">search</i>
						</a>

					</li>
				`
			})

			lista.innerHTML = html
		})
		.catch((err) => {
			console.log("Erro:", err)
			alert("Erro ao buscar ruas")
		})
}

// ==========================
// LIMPAR TUDO (COMPLETO)
// ==========================
function limparTudo() {
	// CEP
	document.getElementById("cep").value = ""
	document.getElementById("cidade").value = ""
	document.getElementById("bairro").value = ""
	document.getElementById("estado").value = ""
	document.getElementById("ddd").value = ""

	// RUA
	document.getElementById("uf-rua").value = ""
	document.getElementById("cidade-rua").value = ""
	document.getElementById("rua").value = ""

	// LISTA
	document.getElementById("lista-ruas").innerHTML = ""

	// REMOVE ESTADOS VISUAIS
	document.querySelectorAll("input").forEach((input) => {
		input.classList.remove("valid", "invalid")
	})

	// Atualiza Materialize
	M.updateTextFields()
}