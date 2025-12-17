# JWT Authentication API - Incuca

Este proyecto es una implementación robusta de autenticación basada en **JWT (JSON Web Tokens)** para aplicaciones Laravel.

## 🚀 Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. **Configurar Base de Datos**: Asegúrate de tener tu archivo `.env` configurado.
2. **Migraciones y Datos Iniciales**:
Ejecuta el siguiente comando para crear las tablas y el usuario administrador por defecto:
```bash
php artisan migrate --seed

```


3. **Credenciales de Acceso**:
El seeder creará automáticamente el siguiente usuario:
* **Usuario:** `cliente@incuca.com.br`
* **Password:** `seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga`



---

## 🧪 Pruebas (Testing)

Para garantizar la integridad de los endpoints de autenticación, ejecuta la suite de pruebas automatizadas:

```bash
php artisan test

```

---

## 🛠 Referencia de la API

Todos los endpoints de autenticación están agrupados bajo el prefijo `/api/auth/`.

| Método | Endpoint | Descripción | Requiere Token |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Inicia sesión y devuelve el token JWT. | No |
| `POST` | `/api/auth/me` | Obtiene los datos del usuario autenticado. | **Sí** |
| `POST` | `/api/auth/refresh` | Renueva el token actual por uno nuevo. | **Sí** |
| `POST` | `/api/auth/logout` | Invalida el token y cierra la sesión. | **Sí** |

---

## 🔐 Flujo de Autenticación

1. **Login**: Envía una petición `POST` a `/api/auth/login` con tus credenciales (`email` y `password`).
2. **Obtención del Token**: Si las credenciales son válidas, recibirás una respuesta JSON con el `access_token`.
3. **Uso del Token**: Para acceder a rutas protegidas, debes incluir el token en el encabezado de tus peticiones HTTP:
```http
Authorization: Bearer <tu_token_aqui>

```


4. **Expiración**: Los tokens tienen un tiempo de vida limitado. Utiliza el endpoint `/refresh` para obtener uno nuevo sin tener que loguearte de nuevo.

---

### Tecnologías utilizadas

* **Framework:** Laravel 11.x
* **Auth:** JWT-Auth
* **Tests:** Pest / PHPUnit
