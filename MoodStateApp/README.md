# MoodStateApp

Aplicación web desarrollada con Vue 3 y Vite para el seguimiento del estado de ánimo y entretenimiento, implementada como parte de una prueba técnica.

## 🚀 Introducción

Este proyecto es un frontend moderno y desacoplado que consume una API RESTful. Está construido siguiendo buenas prácticas de arquitectura, modularización y código limpio.

**Tecnologías principales:**
-   **Vue 3** (Composition API)
-   **Vite** (Build tool & Dev server)
-   **Vuetify** (Framework de UI)
-   **Pinia** (Gestión de estado global)
-   **Vue Router** (Navegación)
-   **Axios** (Cliente HTTP con interceptores)

## 🛠️ Configuración e Inicio

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos
-   Node.js (v20.19.0 o superior recomendado)
-   Backend de la API corriendo en `http://localhost:8000` (o configurar `.env`)

### Instalación

1.  Clona el repositorio (si aplica) o navega a la carpeta del proyecto.
2.  Instala las dependencias:

```sh
npm install
```

### Ejecución en Desarrollo

Para iniciar el servidor de desarrollo con recarga en caliente (HMR):

```sh
npm run dev
```

La aplicación estará disponible generalmente en `http://localhost:5173`.

### Compilación para Producción

Para construir la aplicación optimizada para producción:

```sh
npm run build
```

## 📍 Rutas de la Aplicación

El sistema de navegación está gestionado por Vue Router y cuenta con protección de rutas mediante autenticación JWT.

| Ruta | Acceso | Descripción |
| :--- | :--- | :--- |
| `/` | **Público** | **Home**. Página de aterrizaje. Muestra una bienvenida general. Si el usuario está autenticado, muestra un saludo personalizado y acceso directo a las funcionalidades privadas. |
| `/login` | **Público** | **Iniciar Sesión**. Formulario para autenticarse con email y contraseña. Redirige al Home tras un login exitoso. |
| `/jokes` | **Privado** | **Chistes Geek**. Vista protegida que consume la API para mostrar chistes aleatorios. Requiere un token de sesión válido. |

## 🔐 Autenticación y Seguridad

-   **Persistencia**: El token JWT se almacena en `localStorage` para mantener la sesión activa entre recargas.
-   **Interceptores**: Axios intercepta todas las peticiones para adjuntar el token automáticamente.
-   **Guards**: El router verifica la autenticación antes de entrar a rutas protegidas (`/jokes`) y redirige al login si es necesario.
