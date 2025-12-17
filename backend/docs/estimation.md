# Estimativa de Tempo e Esforço

Abaixo detalha-se a estimativa de horas investidas para o desenvolvimento da solução, dividida em requisitos obrigatórios e melhorias.

## ⏱️ Fase 1: Requisitos Obrigatórios (MVP)
*Tempo estimado: ~6 - 8 horas*

| Tarefa | Descrição | Tempo |
| :--- | :--- | :--- |
| **Configuração Inicial** | Setup do Laravel, Git, Ambiente, Pacote JWT. | 1.0h |
| **Autenticação JWT** | Configuração de Guards, AuthController (Login, Me, Logout), Rotas. | 2.0h |
| **Banco de Dados** | Migrações de usuários, Seeders com usuário específico e hash de senha. | 1.0h |
| **Integração API Externa** | Serviço `GeekJokeService`, tratamento de erros, Controller, Resource. | 1.5h |
| **Testes** | Testes de integração (Feature Tests) para Auth e Jokes. | 1.5h |
| **Documentação** | Redação do README e documentação modular. | 1.0h |

## 🚀 Fase 2: Melhorias e Evoluções (Futuro)
*Tempo estimado: ~4 - 6 horas adicionais*

| Tarefa | Descrição | Tempo |
| :--- | :--- | :--- |
| **Dockerização** | Configuração completa de `Dockerfile` e `docker-compose` otimizado para produção. | 2.0h |
| **CI/CD** | Pipelines do GitHub Actions para rodar testes e linter automaticamente. | 2.0h |
| **Caching** | Implementar cache (Redis) para as respostas da API de piadas e reduzir latência. | 1.0h |
| **Rate Limiting** | Ajustar limites de requisições por usuário para evitar abusos. | 0.5h |
