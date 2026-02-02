# 🎬 API de Gerenciamento de Filmes 

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Esta API RESTful permite o gerenciamento de filmes (CRUD), integrando-se automaticamente à **OMDb API** para enriquecer os dados cadastrados e utilizando **Firebase Firestore** para persistência de dados em nuvem.

---

## 🚀 Funcionalidades

- **Autenticação Segura:** Login e Registro de usuários com criptografia (Bcrypt) e Tokens JWT.
- **CRUD Completo:** Criação, Leitura, Atualização e Remoção de filmes.
- **Integração Externa Inteligente:** Ao cadastrar um filme pelo título, o sistema busca automaticamente Poster, Diretor e Ano na OMDb API.
- **Banco de Dados Real:** Persistência de dados utilizando Google Firebase (Firestore).
- **Testes de Integração:** Testes automatizados com Jest e Supertest para garantir a segurança das rotas.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi estruturado seguindo a arquitetura **MVC (Model-View-Controller)** para garantir organização e escalabilidade.

- **Back-end:** Node.js + Express
- **Banco de Dados:** Firebase Firestore (NoSQL)
- **Autenticação:** JSON Web Token (JWT)
- **Integração:** Axios (Consumo da OMDb API)
- **Testes:** Jest + Supertest
- **Util:** Dotenv, Nodemon

---

## 📂 Estrutura do Projeto

```bash
/src
  ├── config/       # Configuração do Firebase e Banco de Dados
  ├── controllers/  # Lógica das requisições (Filmes e Auth)
  ├── middlewares/  # Verificação de Token JWT
  ├── routes/       # Definição das rotas da API
  ├── services/     # Integração com APIs externas (OMDb)
  └── app.js        # Configuração principal do Express
/tests              # Testes automatizados (Jest)
```
## ⚙️ Pré-requisitos e Instalação
Antes de começar, você vai precisar ter instalado em sua máquina o Git, o Node.js e criar uma conta na OMDb API (Grátis).

1. Clone o repositório
```bash
git clone [https://github.com/SEU_USUARIO/triibo-backend-test.git](https://github.com/SEU_USUARIO/triibo-backend-test.git)
cd triibo-backend-test
```
2. Instale as dependências
```bash

npm install
```
3. Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e preencha conforme o exemplo:
```bash
PORT=3000
OMDB_API_KEY=sua_chave_aqui
JWT_SECRET=seu_segredo_super_secreto
```
4. Configure o Firebase
Baixe o arquivo de credenciais (```serviceAccountKey.json```) do seu projeto no console do Firebase.
Coloque o arquivo na pasta: ```src/config/serviceAccountKey.json.```
---
## ⚡ Como Executar
Modo de Desenvolvimento
Para rodar o servidor com hot-reload (reinicia ao salvar):
```Bash
npm run dev
```
O servidor iniciará em: http://localhost:3000

Rodar Testes
Para executar os testes automatizados de integração:
```Bash
npm test
```
## 📍 Documentação da API

🔐 Autenticação
Método | Rota |	Descrição |	Body (JSON) |
|---|---|---|---|
POST	| /auth/register |	Cria novo usuário	| {"email": "...", "password": "..."} |
POST	| /auth/login	| Retorna o Token JWT	| {"email": "...", "password": "..."} |


🎬 Filmes (Requer Header Authorization: Bearer <TOKEN>)
Método |	Rota	| Descrição |	Body (JSON) |
|---|---|---|---|
GET	| /api/movies |	Lista todos os filmes |	N/A |
POST	| /api/movies |	Cadastra um filme	| {"title": "Matrix", "description": "..."} |
PUT |	/api/movies/:id |	Atualiza um filme |	{"title": "Novo Titulo"} |
DELETE | /api/movies/:id | Remove um filme | N/A |

---
## 👨‍💻 Autor
Desenvolvido por

|  [<img src="https://avatars.githubusercontent.com/u/91349698?v=4" width=115><br><sub>Stella Hada</sub>](https://github.com/stellahada) | 
| :---: |
