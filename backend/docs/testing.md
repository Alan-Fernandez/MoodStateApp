# Testes e Qualidade de Código

O projeto conta com uma suíte de testes automatizados utilizando **Pest** (construído sobre PHPUnit), focados principalmente em testes de integração (Feature Tests) para validar os fluxos completos da API.

## Execução de Testes

Para executar todos os testes, utilize o comando:

```bash
php artisan test
```

## Cobertura de Testes

### 1. Autenticação (`tests/Feature/AuthTest.php`)
*   ✅ **Login com Sucesso:** Verifica se um token JWT é retornado com credenciais válidas.
*   ✅ **Login com Falha:** Verifica se retorna 401 com credenciais inválidas.
*   ✅ **Rotas Protegidas:** Verifica se `/api/auth/me` é acessível apenas com token.
*   ✅ **Bloqueio de Acesso:** Verifica se usuários anônimos não podem acessar rotas privadas.

### 2. Piadas Geek (`tests/Feature/JokeTest.php`)
*   ✅ **Consumo com Sucesso:** Simula uma resposta 200 da API externa e verifica a normalização do JSON.
*   ✅ **Tratamento de Erros:** Simula uma queda (500) da API externa e verifica se o backend responde com 503 (Service Unavailable) em vez de falhar.
*   ✅ **Segurança:** Confirma que o endpoint requer autenticação.

## Mocking
Utiliza-se `Http::fake()` do Laravel para simular as respostas da API externa de Geek Jokes. Isso assegura que:
1.  Os testes sejam rápidos (não dependem da rede real).
2.  Os testes sejam determinísticos (sempre dão o mesmo resultado).
3.  Não sejam realizadas requisições reais à API de terceiros durante o testing.
