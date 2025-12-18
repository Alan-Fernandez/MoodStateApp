# Referência da API REST

A API segue os padrões RESTful e utiliza JSON para a troca de dados.

**Base URL:** `http://localhost:8000/api`

## 🔐 Autenticação

Todas as rotas protegidas requerem o seguinte cabeçalho:
`Authorization: Bearer <seu_token_jwt>`

### 1. Registrar Usuário (Register)
Cria um novo usuário no sistema.

*   **Método:** `POST`
*   **Endpoint:** `/auth/register`
*   **Acesso:** Público
*   **Body:**
    ```json
    {
        "name": "Novo Usuário",
        "email": "novo@exemplo.com",
        "password": "senha_segura"
    }
    ```
*   **Resposta (201 Created):**
    ```json
    {
        "message": "User successfully registered",
        "user": {
            "name": "Novo Usuário",
            "email": "novo@exemplo.com",
            "updated_at": "...",
            "created_at": "...",
            "id": 2
        },
        "authorization": {
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbG...",
            "token_type": "bearer",
            "expires_in": 3600
        }
    }
    ```

### 2. Iniciar Sessão (Login)
Gera um token JWT para um usuário existente.

*   **Método:** `POST`
*   **Endpoint:** `/auth/login`
*   **Acesso:** Público
*   **Body:**
    ```json
    {
        "email": "cliente@incuca.com.br",
        "password": "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga"
    }
    ```
*   **Resposta (200 OK):**
    ```json
    {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbG...",
        "token_type": "bearer",
        "expires_in": 3600
    }
    ```

### 3. Obter Usuário Atual (Me)
Retorna as informações do usuário proprietário do token.

*   **Método:** `GET`
*   **Endpoint:** `/auth/me`
*   **Acesso:** Privado (Token requerido)
*   **Resposta (200 OK):**
    ```json
    {
        "id": 1,
        "name": "Admin Client",
        "email": "cliente@incuca.com.br",
        "created_at": "..."
    }
    ```

### 4. Atualizar Token (Refresh)
Invalida o token atual e retorna um novo com tempo de vida reiniciado.

*   **Método:** `POST`
*   **Endpoint:** `/auth/refresh`
*   **Acesso:** Privado (Token requerido)

### 5. Encerrar Sessão (Logout)
Invalida o token atual na lista negra (blacklist) do servidor.

*   **Método:** `POST`
*   **Endpoint:** `/auth/logout`
*   **Acesso:** Privado (Token requerido)

---

## 🃏 Piadas (Geek Jokes)

### Obter Piada Aleatória
Obtém uma piada geek aleatória. O backend se encarrega de consultar a API externa, tratar erros e retornar uma resposta limpa.

*   **Método:** `GET`
*   **Endpoint:** `/jokes/random`
*   **Acesso:** Privado (Token requerido)
*   **Resposta de Sucesso (200 OK):**
    ```json
    {
        "data": {
            "joke": "Chuck Norris can retrieve constants from an interface.",
            "source": "Geek Joke API",
            "fetched_at": "2025-12-17T20:00:00+00:00"
        }
    }
    ```
*   **Erro de Serviço (503 Service Unavailable):**
    Ocorre se a API externa estiver fora do ar ou demorar muito para responder.
    ```json
    {
        "error": "Unable to fetch a joke at this time. Please try again later."
    }
    ```
