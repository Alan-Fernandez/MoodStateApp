# Teste Fullstack Incuca - Dockerizado

Este projeto contém uma aplicação Fullstack (Laravel + Vue.js) totalmente dockerizada para facilitar a implantação e avaliação.

## 🚀 Como executar o projeto

O projeto está configurado para ser iniciado com um único comando usando Docker Compose.

### Pré-requisitos
- Docker Desktop instalado e em execução.

### Passos
1. Clonar o repositório.
2. Executar o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```

A flag `--build` garante que as imagens sejam construídas com as alterações mais recentes.

O processo de inicialização realizará automaticamente:
- Construção das imagens de Backend e Frontend.
- Inicialização do banco de dados MySQL.
- Instalação de dependências PHP (Composer).
- Execução de migrações e seeders.
- Implantação do servidor web.

Aguarde até que os logs indiquem que o servidor Laravel foi iniciado (`Starting Laravel server...`).

## 🌐 URLs de Acesso

Uma vez iniciado, você pode acessar os serviços em:

- **Frontend (Vue.js):** [http://localhost:3000](http://localhost:3000)
- **Backend API (Laravel):** [http://localhost:8000/api](http://localhost:8000/api)

## � Credenciais de Acesso

O sistema é inicializado com um usuário administrador padrão:

- **Email:** `cliente@incuca.com.br`
- **Senha:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`

## �📦 Estrutura do Projeto

```
/
├── backend/            # Código fonte Laravel
│   ├── Dockerfile      # Configuração Docker para Backend
│   └── ...
├── MoodStateApp/       # Código fonte Vue.js (Frontend)
│   ├── Dockerfile      # Configuração Docker para Frontend
│   ├── nginx.conf      # Configuração Nginx para SPA
│   └── ...
├── docker-compose.yml  # Orquestração de serviços
└── README.md           # Documentação
```

## 🛠 Serviços Docker

O arquivo `docker-compose.yml` define 3 serviços principais:

1.  **backend**:
    -   Imagem baseada em `php:8.4-fpm`.
    -   Instala dependências do sistema e extensões PHP necessárias.
    -   Executa `composer install`, migrações e seeders na inicialização.
    -   Expõe a API na porta `8000`.
    -   Conecta-se ao banco de dados `db`.

2.  **frontend**:
    -   Build multi-estágio:
        -   **Build**: Node.js 20 + Vite para compilar os assets estáticos.
        -   **Production**: Nginx (Alpine) para servir a aplicação.
    -   Configurado para redirecionar todas as rotas para o `index.html` (SPA).
    -   Expõe a aplicação na porta `3000`.
    -   Consome a API do backend configurada via `VITE_API_URL`.

3.  **db**:
    -   Imagem oficial `mysql:8.0`.
    -   Persistência de dados através do volume `db_data`.

## ⚙️ Variáveis de Ambiente

As variáveis principais estão definidas no `docker-compose.yml` para garantir que tudo funcione sem configuração manual:

-   **Backend**:
    -   `DB_CONNECTION`: mysql
    -   `DB_HOST`: db
    -   `GEEK_JOKES_API_URL`: URL da API externa.

-   **Frontend**:
    -   `VITE_API_URL`: `http://localhost:8000/api` (Injetada em tempo de construção).

## 📝 Justificativa Técnica

-   **Docker Compose**: Permite orquestrar todo o stack com um único comando, garantindo que o ambiente de avaliação seja idêntico ao de desenvolvimento.
-   **Multi-stage Build (Frontend)**: Reduz drasticamente o tamanho da imagem final e separa o ambiente de construção (Node) do de execução (Nginx), seguindo boas práticas de segurança e desempenho.
-   **Entrypoint Script (Backend)**: Automatiza tarefas repetitivas (migrações, seeds) que normalmente exigiriam intervenção manual, cumprindo o requisito de "experiência de execução simples".
-   **Separação de Responsabilidades**: Cada serviço tem seu próprio container e Dockerfile, facilitando a manutenção e escalabilidade.

---

## ⏱️ Estimativa de Tempo de Desenvolvimento

Para ver os detalhes da estimativa de tempo, consulte o arquivo [docs/estimation.md](docs/estimation.md).