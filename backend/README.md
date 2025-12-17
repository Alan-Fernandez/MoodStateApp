# Backend REST API - Incuca Technical Test

> **API RESTful segura e escalável para suporte de SPA e consumo de serviços externos.**

Bem-vindo à documentação do backend para o teste técnico Fullstack da Incuca. Este projeto implementa uma API robusta utilizando **Laravel 11**, projetada para servir como núcleo lógico e de segurança para uma aplicação Frontend (SPA).

O sistema gerencia a autenticação de usuários através de **JWT (JSON Web Tokens)**, assegura a persistência de sessões e atua como um **proxy seguro** para o consumo da API externa de "Geek Jokes", garantindo que a lógica de negócio e as comunicações externas permaneçam ocultas e controladas a partir do servidor.

---

## 📚 Documentação Modular

Para manter este arquivo limpo e legível, a documentação detalhada foi organizada nas seguintes seções:

*   📄 **[Guia de Instalação e Configuração](docs/setup_guide.md)**: Passos para inicializar o projeto, migrações e usuário administrador.
*   🏗 **[Arquitetura e Decisões Técnicas](docs/architecture.md)**: Explicação do stack, padrões de projeto e o papel do backend como proxy.
*   🔗 **[Referência da API](docs/api_reference.md)**: Documentação detalhada de endpoints, métodos e exemplos de resposta.
*   🧪 **[Testes e Qualidade](docs/testing.md)**: Como executar a suíte de testes e quais cenários estão cobertos.
*   ⏱ **[Estimativa de Tempo](docs/estimation.md)**: Detalhamento de horas investidas e possíveis melhorias futuras.

---

## 🚀 Início Rápido

Se você já tem experiência com Laravel, aqui estão os comandos essenciais para começar:

```bash
# 1. Instalar dependências
composer install

# 2. Configurar ambiente
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# 3. Banco de Dados e Usuário Admin
php artisan migrate --seed

# 4. Iniciar servidor
php artisan serve
```

### 🔑 Credenciais Padrão
O sistema é inicializado com um usuário administrador pronto para uso:
*   **Email:** `cliente@incuca.com.br`
*   **Senha:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`

---

## 🌟 Visão Geral do Fluxo

1.  **Autenticação:** O usuário faz login com email/senha. O backend valida e retorna um JWT.
2.  **Sessão:** O frontend armazena este token e o envia em cada requisição subsequente (`Authorization: Bearer ...`).
3.  **Consumo Externo (Proxy):** Quando o usuário solicita uma piada, o frontend chama o backend (`/api/jokes/random`). O backend valida o token, consulta a API externa de Geek Jokes, normaliza a resposta e a entrega ao cliente.

---
Desenvolvido com ❤️ utilizando Laravel 11.
