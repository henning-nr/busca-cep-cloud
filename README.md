# Busca CEP Cloud ☁️ - Progressive Web App (PWA)

## 1. Sobre o Projeto
O **Busca CEP Cloud** é uma aplicação web desenvolvida para a consulta rápida e fácil de Códigos de Endereçamento Postal (CEP) e logradouros em todo o Brasil. Através de uma interface limpa e intuitiva, os usuários podem realizar pesquisas por CEP ou descobrir o CEP de uma rua específica.

**Objetivo da aplicação:**
Fornecer um utilitário prático para usuários e profissionais que necessitam validar endereços de forma rápida, transformando uma aplicação web comum em uma experiência "app-like" moderna e resiliente através de tecnologias PWA.

**Tecnologias Utilizadas:**
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **Materialize CSS** (Framework de UI responsivo)
- **Fetch API & Axios** (Para consumo das APIs externas ViaCEP e IBGE)
- **Service Workers & Web App Manifest** (Para funcionalidades PWA)

---

## 2. Conceitos de PWA (Progressive Web App)

Uma **PWA (Progressive Web App)** é uma aplicação web que utiliza tecnologias modernas para oferecer uma experiência muito semelhante à de um aplicativo nativo (como os de Android ou iOS). 

### Principais características aplicadas neste projeto:

- **Instalável:**
Graças ao arquivo `manifest.json`, o navegador reconhece a aplicação como instalável. O usuário pode adicionar o "Busca CEP Cloud" à tela inicial do seu celular ou desktop, e ele abrirá em uma janela própria, sem a barra de navegação do browser (modo `standalone`).

- **Offline (Service Worker):**
O `service-worker.js` age como um proxy (intermediário) entre o navegador e a rede. Ele intercepta as requisições de rede e decide se vai buscar na internet ou no cache local.
Neste projeto, utilizamos a estratégia de **Cache Estático** no momento da instalação (`install`), salvando localmente os arquivos essenciais (`index.html`, CSS, JS e ícones). Assim, se o usuário estiver sem internet, o layout da aplicação ainda vai carregar perfeitamente e uma mensagem de erro customizada será apresentada caso ele tente buscar um CEP sem conexão, melhorando a experiência (evitando a famosa tela do "Dinossauro").

- **Responsividade:**
A interface (construída com Materialize CSS) adapta o layout para qualquer tamanho de tela (celular, tablet ou desktop).

- **`manifest.json`**:
Um arquivo JSON contendo as "metadatas" do app: nome, nome curto, cores de tema (`theme_color`), cor de fundo na tela de carregamento, ícones de vários tamanhos (192x192 e 512x512) e qual URL abrir ao iniciar.

- **`service-worker.js`**:
Um script JavaScript que roda em segundo plano. Ele gerencia o ciclo de vida:
1. `install`: Baixa os assets (arquivos) pro cache.
2. `activate`: Limpa caches antigos em caso de atualizações de versão.
3. `fetch`: Intercepta as chamadas de rede para fornecer a versão do cache ou buscar na rede (estrategias como Cache-First, Network-First, Stale-While-Revalidate).

---

## 3. Como rodar o projeto localmente

Como o projeto é apenas frontend (arquivos estáticos de HTML, CSS e JS) e utiliza **Service Workers**, você precisará rodá-lo através de um servidor local (Service Workers não funcionam acessando o arquivo direto `file://`).

**Opção 1: Usando a extensão Live Server (VS Code)**
1. Abra a pasta do projeto no VS Code.
2. Instale a extensão `Live Server`.
3. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
4. O navegador abrirá automaticamente em `http://127.0.0.1:5500/`.

**Opção 2: Usando Node.js / npx serve**
Se você tiver o Node.js instalado, basta abrir o terminal na pasta do projeto e rodar:
```bash
npx serve .
```
O console mostrará o endereço (geralmente `http://localhost:3000`) para você acessar no navegador.

---

## 4. Como fazer o deploy no Netlify

O [Netlify](https://www.netlify.com/) é uma plataforma excelente para hospedar sites estáticos e aplicações frontend de forma gratuita e rápida. Abaixo estão os passos realizados para publicar este projeto:

### Passo a Passo: Upload Manual (Netlify Drop)
1. **Preparação:** Certifique-se de que todos os arquivos (`index.html`, `manifest.json`, pastas `css`, `js` e `img`) estejam na mesma pasta principal.
2. **Acesso:** Entre no site [app.netlify.com/drop](https://app.netlify.com/drop) (você pode precisar criar uma conta gratuita).
3. **Upload do projeto:** Arraste a pasta inteira do seu projeto (que contém o `index.html`) para a área indicada ("Drag and drop your site output folder here").
4. **Deploy:** O Netlify fará o upload e publicará o site instantaneamente.
5. **Configuração (Opcional):** Acesse as configurações de "Site settings" > "Domain management" para renomear a URL do site para algo mais amigável, como `busca-cep-seu-nome.netlify.app`.

### Passo a Passo: Integrando com o GitHub (Recomendado)
1. Suba o código deste projeto para um repositório público ou privado no seu **GitHub**.
2. Faça login no **Netlify**.
3. Clique em **"Add new site"** > **"Import an existing project"**.
4. Selecione **GitHub** e autorize o acesso.
5. Selecione o repositório do "busca-cep-cloud".
6. Como não há processo de build (como no React/Angular), deixe o `Build command` em branco e o `Publish directory` como `/` (diretório raiz).
7. Clique em **"Deploy site"**.
8. O Netlify publicará o site e criará o link final da aplicação.

**🚀 Link final da aplicação:** 
Após seguir esses passos, você terá um link como: `https://busca-cep-cloud.netlify.app`
*(Coloque aqui o link real do seu deploy no Netlify assim que finalizar!)*
