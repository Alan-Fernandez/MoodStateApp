# 🛠️ Guía de Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo localmente.

## 📋 Prerrequisitos

-   **Node.js:** v20.19.0 o superior.
-   **NPM:** Incluido con Node.js.
-   **Backend:** El servidor API debe estar ejecutándose en el puerto `8000`.

## 🚀 Instalación Manual

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repo>
    cd MoodStateApp
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz (o usa el existente) y define la URL de la API:
    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

4.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## 🐳 Ejecución con Docker (Opcional)

Para facilitar el despliegue y asegurar un entorno consistente, el proyecto está preparado para ser contenerizado.

1.  **Construir la imagen:**
    ```bash
    docker build -t moodstate-frontend .
    ```

2.  **Correr el contenedor:**
    ```bash
    docker run -p 5173:5173 moodstate-frontend
    ```

## ✅ Tests (Diferencial)

El proyecto contempla la estructura para pruebas unitarias y de integración.

-   **Ejecutar tests unitarios:**
    ```bash
    npm run test:unit
    ```
-   **Ejecutar linter:**
    ```bash
    npm run lint
    ```

## 📦 Build para Producción

Para generar los archivos estáticos optimizados para producción:

```bash
npm run build
```
Los archivos se generarán en la carpeta `dist/`.
