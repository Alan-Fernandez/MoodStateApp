# Incuca Fullstack Test - Dockerized

Este proyecto contiene una aplicación Fullstack (Laravel + Vue.js) completamente dockerizada para facilitar su despliegue y evaluación.

## 🚀 Cómo levantar el proyecto

El proyecto está configurado para iniciarse con un solo comando utilizando Docker Compose.

### Prerrequisitos
- Docker Desktop instalado y corriendo.

### Pasos
1. Clonar el repositorio.
2. Ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

El flag `--build` asegura que se construyan las imágenes con los últimos cambios.

El proceso de inicio realizará automáticamente:
- Construcción de imágenes de Backend y Frontend.
- Levantamiento de base de datos MySQL.
- Instalación de dependencias de PHP (Composer).
- Ejecución de migraciones y seeders.
- Despliegue del servidor web.

Espere a que los logs indiquen que el servidor Laravel ha iniciado (`Starting Laravel server...`).

## 🌐 URLs de Acceso

Una vez levantado, puede acceder a los servicios en:

- **Frontend (Vue.js):** [http://localhost:3000](http://localhost:3000)
- **Backend API (Laravel):** [http://localhost:8000/api](http://localhost:8000/api)

## 📦 Estructura del Proyecto

```
/
├── backend/            # Código fuente Laravel
│   ├── Dockerfile      # Configuración Docker para Backend
│   └── ...
├── MoodStateApp/       # Código fuente Vue.js (Frontend)
│   ├── Dockerfile      # Configuración Docker para Frontend
│   ├── nginx.conf      # Configuración Nginx para SPA
│   └── ...
├── docker-compose.yml  # Orquestación de servicios
└── README.md           # Documentación
```

## 🛠 Servicios Docker

El archivo `docker-compose.yml` define 3 servicios principales:

1.  **backend**:
    -   Imagen basada en `php:8.4-fpm`.
    -   Instala dependencias de sistema y extensiones PHP necesarias.
    -   Ejecuta `composer install`, migraciones y seeders al inicio.
    -   Expone la API en el puerto `8000`.
    -   Se conecta a la base de datos `db`.

2.  **frontend**:
    -   Construcción multi-etapa:
        -   **Build**: Node.js 20 + Vite para compilar los assets estáticos.
        -   **Production**: Nginx (Alpine) para servir la aplicación.
    -   Configurado para redirigir todas las rutas al `index.html` (SPA).
    -   Expone la aplicación en el puerto `3000`.
    -   Consume la API del backend configurada vía `VITE_API_URL`.

3.  **db**:
    -   Imagen oficial `mysql:8.0`.
    -   Persistencia de datos mediante volumen `db_data`.

## ⚙️ Variables de Entorno

Las variables clave están definidas en `docker-compose.yml` para asegurar que todo funcione sin configuración manual:

-   **Backend**:
    -   `DB_CONNECTION`: mysql
    -   `DB_HOST`: db
    -   `GEEK_JOKES_API_URL`: URL de la API externa.

-   **Frontend**:
    -   `VITE_API_URL`: `http://localhost:8000/api` (Inyectada en tiempo de construcción).

## 📝 Justificación Técnica

-   **Docker Compose**: Permite orquestar todo el stack con un solo comando, garantizando que el entorno de evaluación sea idéntico al de desarrollo.
-   **Multi-stage Build (Frontend)**: Reduce drásticamente el tamaño de la imagen final y separa el entorno de construcción (Node) del de execução (Nginx), siguiendo buenas prácticas de seguridad y rendimiento.
-   **Entrypoint Script (Backend)**: Automatiza tareas repetitivas (migraciones, seeds) que normalmente requerirían intervención manual, cumpliendo con el requisito de "experiencia de ejecución simple".
-   **Separación de Responsabilidades**: Cada servicio tiene su propio contenedor y Dockerfile, facilitando el mantenimiento y escalabilidad.

---

## ⏱️ Estimativa de Tempo de Desenvolvimento

Antes de iniciar a implementação, foi realizada uma estimativa preliminar do tempo necessário para desenvolver a aplicação, considerando **apenas o cumprimento dos requisitos obrigatórios do teste técnico**, sem incluir evoluções ou funcionalidades extras.

### ⏳ Tempo total estimado: **8 horas**

A seguir, o detalhamento da estimativa:

---

### 🔧 Backend (Laravel – API REST)

**Tempo estimado: 3 horas**

* Criação do projeto Laravel e configuração inicial
* Configuração de autenticação com JWT
* Criação de migrations e seeders para o usuário inicial
* Implementação do endpoint de login
* Implementação do endpoint protegido para consumo da API de piadas geek
* Validações básicas, tratamento de erros e organização da estrutura

---

### 🎨 Frontend (Vue.js – SPA)

**Tempo estimado: 4 horas**

* Setup do projeto Vue.js com Vue Router, Pinia e Vuetify
* Implementação da tela de login com validações
* Persistência do token JWT para manter a sessão após reload
* Criação das rotas `/inicial`, `/triste`, `/poker-face` e `/feliz`
* Gerenciamento do estado de humor da aplicação
* Implementação da modal de piadas e lógica de progressão do humor

---

### 📄 Documentação

**Tempo estimado: 1 hora**

* Criação do README.md
* Explicação da arquitetura do projeto
* Justificativa das escolhas tecnológicas
* Descrição do fluxo da aplicação
* Registro da estimativa de tempo

---

### ✅ Conclusão

A estimativa de **8 horas** foi definida com base na experiência prévia com as tecnologias utilizadas e na complexidade dos requisitos apresentados.
Esse planejamento inicial tem como objetivo garantir transparência, organização e eficiência durante o desenvolvimento da solução.