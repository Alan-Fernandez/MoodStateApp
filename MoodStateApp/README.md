# MoodStateApp - Frontend

Bienvenido a la documentación oficial del frontend de **MoodStateApp**. Esta aplicación ha sido desarrollada como parte de una prueba técnica, enfocándose en la calidad arquitectónica, la modularidad y la experiencia de usuario.

## � Definición y Requisitos del Proyecto

El objetivo de este proyecto es implementar una solución frontend robusta, modular y escalable, siguiendo estrictos estándares de calidad técnica. A continuación se detallan los requisitos y decisiones arquitectónicas que rigen el desarrollo:

### Arquitectura y Tecnologías
El frontend se desarrolla utilizando **Vue.js** como framework principal bajo el enfoque de **Single Page Application (SPA)**. Se prioriza el uso de:
-   **Componentes reutilizables:** Para mantener una interfaz modular.
-   **Gestión de estado en el cliente:** Implementada con **Pinia** para centralizar la lógica de negocio (autenticación y estado emocional).
-   **Análisis estático:** Uso de **ESLint** para garantizar consistencia y calidad de código.
-   **API REST Propia:** Consumo exclusivo de una API backend, manteniendo una separación estricta de responsabilidades. No se realizan llamadas a APIs externas desde el cliente.

### Autenticación y Seguridad
-   **JWT:** La autenticación se maneja mediante JSON Web Tokens.
-   **Persistencia:** El token se almacena en la sesión del navegador para mantener al usuario autenticado entre recargas.
-   **Seguridad:** El token se adjunta automáticamente en el header `Authorization: Bearer <token>` de cada petición protegida mediante interceptores HTTP.
-   **Rutas Protegidas:** Implementación de guards de navegación para restringir el acceso a vistas privadas.

### Flujo de Navegación y Estados Emocionales
La aplicación guía al usuario por una experiencia emocional progresiva:
1.  **Login (Público):** Formulario con validación de email y contraseña (mínimo 8 caracteres).
2.  **Estado Neutral (`/inicial`):** Punto de partida tras la autenticación.
3.  **Estado Triste (`/triste`):** Primer cambio de estado tras la interacción del usuario.
4.  **Estado Poker-Face (`/poker-face`):** Vista intermedia donde se consume una piada geek desde el backend, mostrada en una modal.
5.  **Estado Feliz (`/feliz`):** Se alcanza tras mejorar el humor progresivamente. La modal solo permite cerrarse en este estado, reiniciando el ciclo hacia `/inicial`.

### Interfaz de Usuario (UI)
Se utiliza **Vuetify** como biblioteca de componentes para asegurar:
-   Consistencia visual.
-   Feedback claro durante la carga de datos (spinners, alertas).
-   Estilos globales centralizados y mantenibles.

### Diferenciales Técnicos
-   **Testing:** Estructura preparada para tests unitarios y de integración (Jest/Vitest).
-   **Docker:** Soporte para ejecución contenerizada, facilitando el despliegue y la integración con el backend.

---

## ⏱️ Estimación de Tiempos

| Etapa | Descripción | Tiempo Estimado |
| :--- | :--- | :--- |
| **Fase 1: Core & Requisitos** | Configuración base, autenticación, ruteo de estados emocionales, integración API y UI. | **~8 - 10 Horas** |
| **Fase 2: Mejoras y Calidad** | Tests unitarios, Dockerización, refinamiento de animaciones y documentación. | **~4 - 6 Horas** |

---

## 📚 Documentación Modular

Para profundizar en los detalles técnicos, consulta la documentación específica:

-   [**🏗️ Arquitectura**](./docs/architecture.md): Estructura de carpetas y justificación de tecnologías.
-   [**🚀 Funcionalidades**](./docs/features.md): Detalle profundo de los flujos de usuario.
-   [**🛠️ Setup y Guía de Inicio**](./docs/setup.md): Instrucciones de instalación y ejecución.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```
