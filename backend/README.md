# Backend REST API - Sistema de Autenticación JWT

Bienvenido al backend de la prueba técnica Incuca. Este proyecto es una API RESTful construida sobre **Laravel 11**, diseñada siguiendo principios de arquitectura limpia y buenas prácticas. Implementa un sistema de autenticación seguro y sin estado (stateless) utilizando **JSON Web Tokens (JWT)** via `tymon/jwt-auth`.

## 📋 Características

*   **Autenticación JWT Completa**: Login, Perfil, Refresco de Token y Logout.
*   **Seguridad**: Protección de rutas mediante Middleware y hashing de contraseñas.
*   **Arquitectura**: Controladores delgados y Modelos robustos.
*   **Testing**: Cobertura de pruebas automatizadas con Pest/PHPUnit.

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

1.  **Instalar dependencias:**
    ```bash
    composer install
    ```

2.  **Configurar entorno:**
    Copia el archivo de ejemplo y genera la clave de la aplicación.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *Asegúrate de configurar tu base de datos (SQLite, MySQL, etc.) en el archivo `.env`.*

3.  **Generar Secret JWT:**
    Es crucial para firmar los tokens.
    ```bash
    php artisan jwt:secret
    ```

4.  **Migraciones y Seeders:**
    Inicializa la base de datos y crea el usuario administrador.
    ```bash
    php artisan migrate --seed
    ```

## 👤 Usuarios por Defecto

El seeder inicial crea un usuario administrador para pruebas inmediatas:

*   **Email:** `cliente@incuca.com.br`
*   **Contraseña:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`

## 📚 Documentación de la API

Todos los endpoints de autenticación se encuentran bajo el prefijo `/api/auth`.

### 1. Iniciar Sesión (Login)

Obtén un token de acceso proporcionando credenciales válidas.

*   **Endpoint:** `POST /api/auth/login`
*   **Auth:** No requerida
*   **Body (JSON):**
    ```json
    {
        "email": "cliente@incuca.com.br",
        "password": "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga"
    }
    ```
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbG...",
        "token_type": "bearer",
        "expires_in": 3600
    }
    ```

### 2. Obtener Usuario Actual (Me)

Recupera la información del usuario autenticado basado en el token.

*   **Endpoint:** `GET /api/auth/me`
*   **Auth:** Bearer Token
*   **Headers:**
    *   `Authorization: Bearer <tu_access_token>`
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "id": 1,
        "name": "Admin Client",
        "email": "cliente@incuca.com.br",
        "email_verified_at": null,
        "created_at": "2025-12-17T20:00:00.000000Z",
        "updated_at": "2025-12-17T20:00:00.000000Z"
    }
    ```

### 3. Refrescar Token

Invalida el token actual y devuelve uno nuevo. Útil para mantener la sesión activa.

*   **Endpoint:** `POST /api/auth/refresh`
*   **Auth:** Bearer Token
*   **Headers:**
    *   `Authorization: Bearer <tu_access_token>`
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbG...",
        "token_type": "bearer",
        "expires_in": 3600
    }
    ```

### 4. Cerrar Sesión (Logout)

Invalida el token actual permanentemente.

*   **Endpoint:** `POST /api/auth/logout`
*   **Auth:** Bearer Token
*   **Headers:**
    *   `Authorization: Bearer <tu_access_token>`
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "message": "Successfully logged out"
    }
    ```

### 5. Obtener Piada Aleatoria (Jokes)

Obtiene una piada aleatoria desde la API externa (Geek Joke API), actuando como proxy seguro.

*   **Endpoint:** `GET /api/jokes/random`
*   **Auth:** Bearer Token
*   **Headers:**
    *   `Authorization: Bearer <tu_access_token>`
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "joke": "Chuck Norris can retrieve constants from an interface.",
        "source": "Geek Joke API"
    }
    ```
*   **Error de Servicio (503 Service Unavailable):**
    ```json
    {
        "error": "Unable to fetch a joke at this time. Please try again later."
    }
    ```

## 🔄 Flujo de Comunicación (Geek Jokes)

El backend actúa como un intermediario seguro entre el frontend y la API externa de Geek Jokes.

1.  **Frontend**: Solicita una piada a `GET /api/jokes/random` incluyendo el token JWT.
2.  **Backend (Middleware)**: Valida el token. Si es inválido, retorna `401 Unauthorized`.
3.  **Backend (Controller/Service)**:
    *   Si el token es válido, el `JokeController` llama a `GeekJokeService`.
    *   El servicio realiza una petición HTTP a `https://geek-jokes.sameerkumar.website/api`.
4.  **API Externa**: Retorna una piada en formato JSON.
5.  **Backend (Resource)**:
    *   Normaliza la respuesta usando `JokeResource`.
    *   Si la API externa falla, captura el error y retorna `503 Service Unavailable`.
6.  **Frontend**: Recibe la piada normalizada o el mensaje de error.

Este diseño asegura que:
*   La API Key (si existiera) o la URL externa no se exponen al cliente.
*   El frontend no depende directamente de la disponibilidad de la API externa.
*   Se mantiene un formato de respuesta consistente.

## 🧪 Ejecutar Pruebas

El proyecto incluye pruebas de funcionalidad (Feature Tests) para garantizar la estabilidad del flujo de autenticación y la integración con la API de piadas.

```bash
php artisan test
```

---
Desarrollado con Laravel 11 y JWT-Auth.
