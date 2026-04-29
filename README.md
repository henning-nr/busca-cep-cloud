# 📍 Busca CEP - Progressive Web App (PWA)

## 📌 Sobre o Projeto

A aplicação **Busca CEP** é uma ferramenta web que permite consultar informações de endereço a partir de um CEP ou buscar CEPs utilizando rua, cidade e estado.

O sistema utiliza a API pública **ViaCEP**, oferecendo uma interface simples, intuitiva e funcional para o usuário.

Além disso, a aplicação possui um sistema de histórico que permite salvar e restaurar buscas realizadas anteriormente.

---

## 🎯 Objetivo

O objetivo deste projeto é transformar uma aplicação web tradicional em uma **Progressive Web App (PWA)**, tornando-a:

* Instalável em dispositivos móveis 📱
* Acessível mesmo com conexão instável 🌐
* Disponível publicamente na internet 🚀

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3 (Materialize)
* JavaScript
* Fetch API
* Axios
* LocalStorage
* API ViaCEP

---

## 📱 Conceitos de PWA

Uma **PWA (Progressive Web App)** é uma aplicação web que oferece uma experiência semelhante a aplicativos nativos, podendo ser instalada no dispositivo do usuário.

### 🔹 Principais características:

* 📲 Instalável no dispositivo
* 🌐 Funciona offline (parcialmente)
* ⚡ Carregamento rápido
* 📱 Interface responsiva
* 🔄 Atualização automática

---

## ⚙️ Componentes do PWA

### 📄 manifest.json

Arquivo responsável por definir:

* Nome da aplicação
* Ícones
* Cores
* Comportamento (modo standalone)

---

### ⚙️ service-worker.js

Responsável por:

* Fazer cache dos arquivos
* Permitir funcionamento offline
* Melhorar performance

---

## ▶️ Como rodar o projeto localmente

Você pode executar o projeto de duas formas:

### ✔️ Opção 1 (Recomendada)

Utilizando o Live Server no VS Code:

1. Clique com o botão direito no arquivo `index.html`
2. Selecione **Open with Live Server**

---

### ✔️ Opção 2

Abrir com qualquer servidor local disponível

---

## 🚀 Deploy no Netlify

Para disponibilizar a aplicação na internet, foi utilizado o Netlify.

### 🔹 Passo a passo:

1. Acessar o site do Netlify
2. Criar uma conta
3. Selecionar "Add new site"
4. Escolher "Deploy manually"
5. Enviar a pasta do projeto
6. Aguardar o deploy automático

---

## 🔗 Link da aplicação

👉 (https://aquamarine-sherbet-ef3b83.netlify.app/)

---

## 📦 Funcionalidades

* Consulta de endereço por CEP
* Busca de CEP por rua
* Histórico de consultas
* Restauração de buscas anteriores
* Interface responsiva
* Aplicação instalável (PWA)
* Cache para uso offline parcial

---

## 📌 Considerações Finais

O projeto demonstra na prática como transformar uma aplicação web simples em uma aplicação moderna, utilizando conceitos de Progressive Web App, melhorando a experiência do usuário e ampliando sua acessibilidade.
