# Prueba Técnica - Desarrollador React + Node

## Descripcion

Aplicacion de gestion de tareas (Task Manager) con un backend REST API en Node/Express y un frontend en React con styled-components.

**El proyecto tiene varios errores intencionados y funcionalidades incompletas.** Tu objetivo es resolver los ejercicios descritos abajo.

---

## Requisitos previos

- Node.js >= 18
- npm

## Instalacion

```bash
npm install           # instala concurrently
npm run install:all   # instala dependencias de backend y frontend
```

## Poner en marcha

```bash
# Semilla de datos (ejecutar una vez)
npm run dev:backend   # arranca el backend primero
# En otra terminal:
cd backend && npm run seed  # poblar la base de datos
cd ..

# Desarrollo (backend + frontend juntos)
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

---

## Stack

- **Backend**: Node.js, Express, SQLite (better-sqlite3)
- **Frontend**: React, Vite, styled-components
- **Testing**: Jest + Supertest (pre-instalados)

## Estructura del proyecto

```
backend/
  src/
    config/database.js        # Conexion y esquema SQLite
    controllers/               # Logica de los endpoints
    models/                    # Acceso a datos (TaskModel, UserModel)
    routes/                    # Definicion de rutas Express
    middleware/                # Error handler
    seed.js                    # Datos iniciales
frontend/
  src/
    components/                # Componentes reutilizables (Button, Modal, Columns, etc.)
    hooks/                     # Custom hooks (useTasks, useUsers)
    services/api.js            # Cliente HTTP
    pages/Home/                # Pagina principal (Home.jsx, partials.jsx)
    assets/icons/              # Iconos SVG como componentes React
```

---

## API Endpoints

| Metodo | Endpoint         | Descripcion            |
| ------ | ---------------- | ---------------------- |
| GET    | /api/health      | Health check           |
| GET    | /api/tasks/stats | Estadisticas de tareas |
| GET    | /api/tasks/:id   | Obtener tarea por ID   |
| POST   | /api/tasks       | Crear tarea            |
| PUT    | /api/tasks/:id   | Actualizar tarea       |
| DELETE | /api/tasks/:id   | Eliminar tarea         |
| GET    | /api/users       | Listar usuarios        |

> **Nota**: Revisa los archivos de rutas y controladores para ver que hay disponible y que falta.

---

## Prueba Tecnica

### Ejercicio 1: Arreglar error de import

Al arrancar el frontend, veras un error que impide que la aplicacion se renderice correctamente.

- Investiga el error, encuentra el import roto y arreglalo.

### Ejercicio 2: Arreglar warning en consola

Abre las DevTools del navegador y revisa la consola. Encontraras un warning de React.

- Identifica la causa y corrigelo.

### Ejercicio 3: Traer el listado de tareas de la API

El frontend intenta cargar las tareas pero el endpoint no existe en el backend.

- Crea el endpoint `GET /api/tasks` en el backend (controller + ruta).
- Debe aceptar query params opcionales: `status`, `priority`, `user_id`.
- El modelo `TaskModel.findAll()` ya soporta estos filtros, solo necesitas conectarlo.

### Ejercicio 4: Modificar una tarea

Importa el icono `EditIcon` en `TaskForm`, ponlo en el IconButton que utilizaremos para editar. Y haz que onClick abra el modal para editar Task

### Ejercicio 5: Componente ConfirmDialog

Haz un componente ConfirmDialog que reciba: `title`, `text`, `onAction`, `onCancel`.

Y sustituye todos los window.confirm() por este nuevo componente

### Ejercicio 6: Arreglar refresco al crear tarea

Al crear una nueva tarea, esta se guarda en base de datos pero **no aparece en el listado** hasta que recargues la pagina.

- Investiga el hook `useTasks` y arregla el problema para que la tarea aparezca inmediatamente.

## Tiempo estimado

30 minutos
