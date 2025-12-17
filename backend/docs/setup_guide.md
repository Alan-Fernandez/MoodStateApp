# Guia de Instalação e Configuração

## Pré-requisitos
*   PHP >= 8.2
*   Composer
*   Git

## Passos de Instalação

1.  **Clonar o repositório e instalar dependências:**
    ```bash
    git clone <url-do-repo>
    cd backend
    composer install
    ```

2.  **Configuração de Ambiente:**
    Duplique o arquivo de exemplo e gere a chave de criptografia do Laravel.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

3.  **Configuração de JWT:**
    Gere o segredo necessário para assinar os tokens JWT.
    ```bash
    php artisan jwt:secret
    ```

4.  **Banco de Dados e Seeders:**
    Este passo é crucial. Execute as migrações para criar a estrutura de tabelas e os seeders para inserir o usuário administrador necessário.
    ```bash
    php artisan migrate --seed
    ```

## 👤 Usuário Inicial (Admin)

O sistema de seeders (`DatabaseSeeder` -> `AdminUserSeeder`) garante a criação automática do seguinte usuário para testes:

*   **Email:** `cliente@incuca.com.br`
*   **Senha:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`

> **Nota:** A senha é armazenada de forma segura utilizando hashing (Bcrypt). Não é possível recuperá-la, apenas verificá-la através do processo de login.

## 🐳 Docker (Opcional)

Se preferir usar Docker (via Laravel Sail), certifique-se de ter o Docker Desktop rodando:

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
```
