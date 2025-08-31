# 📝 Inventario App

### Descripción del Proyecto

Esta es una aplicación de inventario local para la gestión de productos, construida con una arquitectura **Full Stack JavaScript** que utiliza **Next.js** para el frontend y el backend (a través de **API Routes**). La aplicación está optimizada para el rendimiento y una experiencia de desarrollo fluida.

---

### 🛠️ Tecnologías y Arquitectura

* **Frontend**:
    * **Framework**: Next.js
    * **Estilos**: Tailwind CSS 4.0
    * **Estado Global**: Zustand para una gestión de estado simple y escalable.

* **Backend**:
    * **API**: Next.js API Routes (`app/api`)
    * **Base de Datos**: PostgreSQL
    * **ORM**: [Menciona aquí tu ORM, por ejemplo: Prisma, Drizzle, etc.]
    * **Autenticación**: [Menciona aquí tu método de autenticación, por ejemplo: NextAuth.js, JWT, etc.]

---

### 📂 Estructura del Proyecto

La estructura de carpetas sigue las convenciones de Next.js y React para una mejor organización y escalabilidad.

* `src/`: Directorio principal del código fuente.
    * `(auth)/`: **Grupo de rutas** para las vistas de autenticación (Login, Register).
    * `(main)/`: **Grupo de rutas** para las vistas principales de la aplicación (Dashboard, Productos, etc.).
    * `app/`: Contiene la configuración principal de Next.js y las rutas del backend (`/api`).
    * `components/`: Almacena **componentes de React reutilizables** y atómicos.
    * `services/`: Contiene la **lógica de negocio** y los servicios para interactuar con el backend.
    * `utils/`: Funciones de utilidad y helpers.
    * `store/`: Gestión del estado global con **Zustand**.
    * `styles/`: Archivos CSS personalizados y configuración de Tailwind CSS.

---

### 🚀 Cómo Empezar

1.  **Clonar el repositorio**:
    ```bash
    git clone [URL-del-repositorio]
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar la base de datos**:
    * Asegúrate de tener una instancia de PostgreSQL en ejecución.
    * Crea un archivo `.env.local` en la raíz del proyecto.
    * Añade las credenciales de tu base de datos:
        ```
        DATABASE_URL="postgresql://user:password@host:port/database"
        ```

4.  **Ejecutar migraciones (si aplica)**:
    ```bash
    npx prisma migrate dev
    ```

5.  **Iniciar la aplicación**:
    ```bash
    npm run dev
    ```

---

### ✅ Buenas Prácticas y Puntos de Interés

* **Server Components**: La aplicación utiliza Server Components de Next.js para mejorar el rendimiento.
* **Convenciones de Nombres**: Se siguen convenciones claras para los nombres de componentes, variables y archivos.
* **Separación de Responsabilidades**: La lógica de negocio está separada de los componentes de la UI.
* **Estado Mínimo**: El estado global de Zustand se utiliza solo cuando es necesario, priorizando la gestión de estado a nivel de componente.
* **Diseño Modular**: Los componentes son modulares y reutilizables, lo que agiliza el desarrollo de nuevas características.