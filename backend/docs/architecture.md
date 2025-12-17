# Arquitetura e Decisões Técnicas

## 🏗 Stack Tecnológico

Para a resolução deste teste técnico, foi selecionado um stack robusto e moderno baseado no ecossistema PHP:

*   **Framework Backend:** **Laravel 11**. Escolhido por sua expressividade, segurança integrada e rapidez de desenvolvimento. Provê uma estrutura sólida MVC (Model-View-Controller).
*   **Autenticação:** **JWT-Auth (tymon/jwt-auth)**. Optou-se por JWT (JSON Web Tokens) para gerenciar a autenticação de maneira *stateless* (sem estado), ideal para arquiteturas REST API consumidas por SPAs (Single Page Applications).
*   **Banco de Dados:** **SQLite** (padrão para desenvolvimento/testes) ou MySQL. O Laravel abstrai o motor de banco de dados, permitindo alterá-lo apenas com configuração.
*   **Testes:** **Pest / PHPUnit**. Frameworks de testes para assegurar a qualidade do código.

## 📐 Padrões de Projeto e Arquitetura

### 1. Backend como Intermediário Seguro (Proxy)
Uma decisão arquitetônica chave foi que o **Frontend nunca consulta diretamente a API externa de piadas**.
*   **Problema:** Consultar APIs externas a partir do cliente expõe lógica de negócio, possíveis API Keys e torna o frontend dependente da disponibilidade de terceiros.
*   **Solução:** O Backend atua como um proxy seguro.
    *   O Frontend solicita `/api/jokes/random` ao Backend.
    *   O Backend (através de `GeekJokeService`) consulta a API externa.
    *   O Backend normaliza a resposta e trata os erros (Timeouts, 500s).
    *   O Backend entrega um JSON padronizado ao Frontend.

### 2. Camada de Serviços (Service Layer)
Foi implementado `App\Services\GeekJokeService` para encapsular a lógica de comunicação com a API externa. Isso evita "sujar" os controladores com lógica HTTP de terceiros e facilita o testing (mocking).

### 3. Recursos de API (API Resources)
Utiliza-se `App\Http\Resources\JokeResource` para transformar e normalizar os dados antes de enviá-los ao cliente. Isso garante que o contrato da API (a estrutura do JSON) se mantenha estável mesmo se a API externa mudar seu formato.

### 4. Segurança
*   **Hashing:** As senhas são armazenadas utilizando **Bcrypt** (padrão no Laravel).
*   **Middleware:** As rotas sensíveis estão protegidas pelo middleware `auth:api`, que valida a assinatura e expiração do JWT.
*   **Validação:** Utilizam-se FormRequests ou validações em controlador para assegurar a integridade dos dados de entrada.
