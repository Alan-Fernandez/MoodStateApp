# 🚀 Funcionalidades y Flujos de Usuario

Este documento describe el comportamiento funcional de la aplicación, las reglas de negocio y el flujo de navegación basado en el estado emocional del usuario.

## 🔐 Autenticación (Login)

El punto de entrada a la aplicación es un formulario de inicio de sesión seguro.

-   **Ruta:** `/login`
-   **Validaciones:**
    -   **Email:** Debe tener un formato válido.
    -   **Contraseña:** Longitud mínima de 8 caracteres.
-   **Comportamiento:**
    1.  El usuario ingresa credenciales.
    2.  Se envía una petición `POST /auth/login` al backend.
    3.  Si es exitoso, el servidor retorna un **JWT**.
    4.  El token se almacena en `localStorage` para persistencia de sesión.
    5.  El usuario es redirigido a la ruta `/inicial`.

---

## 🎭 Flujo de Estados de Humor

La aplicación es una SPA (Single Page Application) que guía al usuario a través de una transición emocional progresiva.

### 1. Estado Inicial (Neutral)
-   **Ruta:** `/inicial`
-   **Descripción:** Representa un estado de ánimo neutral. Es la pantalla de bienvenida tras el login.
-   **Acción:** Un clic en el elemento principal de la interfaz inicia la transición hacia el siguiente estado.

### 2. Estado Triste
-   **Ruta:** `/triste`
-   **Descripción:** Interfaz visual que refleja tristeza.
-   **Acción:** Un clic adicional redirige al usuario hacia la fase de recuperación del humor (`/poker-face`).

### 3. Estado Poker Face (Recuperación)
-   **Ruta:** `/poker-face`
-   **Descripción:** En esta etapa se busca mejorar el humor del usuario mediante contenido de entretenimiento.
-   **Mecánica:**
    -   Se abre automáticamente una **Modal**.
    -   Se consume el endpoint `GET /jokes/random` (a través del backend propio).
    -   Se muestra una piada geek aleatoria.
    -   **Regla de Negocio:** La modal **NO** puede cerrarse hasta que el "medidor de felicidad" llegue al 100%.
    -   El usuario puede solicitar más piadas. Cada piada leída incrementa el estado de felicidad.

### 4. Estado Feliz (Finalización)
-   **Ruta:** `/feliz`
-   **Descripción:** Se alcanza cuando el medidor de felicidad llega al 100%.
-   **Acción:**
    -   La modal permite cerrarse.
    -   Al cerrar la modal/vista, el ciclo se reinicia y el usuario es redirigido a `/inicial`.

---

## 📡 Consumo de API

Todas las interacciones de datos siguen un patrón estricto:

1.  **Frontend** solicita datos a `http://localhost:8000/api/*`.
2.  **Backend** procesa la solicitud (y consulta APIs externas si es necesario, ej: Geek Jokes).
3.  **Backend** responde con JSON estandarizado.
4.  **Frontend** maneja estados de carga (`loading`) y errores (`error`) para dar feedback al usuario.

> **Nota:** El frontend desconoce la existencia de la API externa de chistes; para él, todo proviene de su propio backend.
