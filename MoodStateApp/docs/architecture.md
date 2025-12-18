# 🏗️ Arquitectura y Decisiones Técnicas

Este documento detalla las decisiones de diseño, la selección de tecnologías y la estructura del proyecto **MoodStateApp**.

## 🛠️ Stack Tecnológico

La elección de tecnologías responde a la necesidad de crear una aplicación escalable, mantenible y alineada con los estándares modernos de desarrollo frontend.

### 1. Vue 3 (Composition API)
Se ha seleccionado **Vue 3** utilizando la **Composition API** (`<script setup>`) para garantizar una mejor reutilización de lógica, una inferencia de tipos superior y un código más limpio en comparación con la Options API tradicional.

### 2. Pinia (Gestión de Estado)
Utilizamos **Pinia** como store global por las siguientes razones:
-   **Modularidad:** Permite dividir el estado en stores pequeños y específicos (`auth`, `mood`, `jokes`).
-   **Simplicidad:** API más intuitiva y menos verbosa que Vuex.
-   **DevTools:** Excelente integración para depuración y "time travel".
-   **Reactividad:** Soporte nativo para la reactividad de Vue 3.

### 3. Vuetify (Sistema de Diseño)
**Vuetify** se utiliza para garantizar consistencia visual y acelerar el desarrollo mediante componentes pre-construidos (`v-card`, `v-btn`, `v-dialog`) que siguen las guías de Material Design. Esto permite centrarse en la lógica de negocio sin descuidar la estética.

### 4. Axios (Comunicación HTTP)
Se utiliza **Axios** configurado como un servicio centralizado (`src/services/api.js`) para:
-   Manejar interceptores de solicitud (inyección automática de JWT).
-   Manejar interceptores de respuesta (gestión global de errores 401/500).
-   Desacoplar la lógica de red de los componentes visuales.

### 5. ESLint (Calidad de Código)
Se ha configurado un sistema de análisis estático estricto para asegurar:
-   Consistencia en el estilo de código.
-   Prevención de errores comunes.
-   Adherencia a las buenas prácticas de Vue.js.

---

## 📐 Estructura del Proyecto

El proyecto sigue una estructura de carpetas semántica que separa responsabilidades claramente:

```
src/
├── assets/          # Recursos estáticos (imágenes, estilos globales SCSS)
├── components/      # Componentes de UI reutilizables y "dumb components"
├── plugins/         # Configuración de librerías (Vuetify)
├── router/          # Configuración de rutas y Guards de navegación
├── services/        # Lógica de comunicación con APIs (Axios)
├── stores/          # Estado global de la aplicación (Pinia)
├── views/           # Páginas principales (Smart components)
│   ├── auth/        # Vistas de autenticación (Login)
│   ├── home/        # Vistas de estado de ánimo (Inicial, Triste, Feliz)
│   └── jokes/       # Vistas de contenido (Poker Face / Modal)
├── App.vue          # Componente raíz y Layout base
└── main.js          # Punto de entrada e inicialización
```

## 🔄 Desacoplamiento Frontend-Backend

El frontend actúa como un **cliente agnóstico**. No contiene lógica de negocio relacionada con la base de datos o reglas de validación complejas del servidor.
-   **Consumo de API:** El frontend solo consume los endpoints expuestos por nuestra propia API REST (`/api/*`).
-   **Proxy de Datos:** Las llamadas a APIs externas (como la de chistes) son responsabilidad exclusiva del backend. El frontend nunca llama a servicios de terceros directamente, evitando problemas de CORS y exposición de claves de API.
