# API Gestión de Tareas

API RESTful para la gestión de tareas personales con autenticación JWT. Permite a los usuarios registrarse, iniciar sesión y administrar sus propias tareas de forma segura.

---
## Arquitectura
 
El proyecto sigue una arquitectura en capas donde cada carpeta tiene una responsabilidad clara:
 
```
src/
├── Api/
│   ├── Middleware/       # Middleware de autenticación JWT
│   └── Route/           # Definición de rutas (TaskRoute, UserRoute)
├── Config/              # Configuración centralizada (App, Prisma, variables de entorno)
├── Controller/          # Lógica que atiende las peticiones HTTP
├── Dto/
│   ├── TaskDto/         # DTOs de entrada y salida para tareas
│   └── UserDto/         # DTOs de entrada y salida para usuarios
├── Exception/           # Manejo centralizado de errores (GlobalException, ErrorMessage)
├── Model/
│   ├── Enum/            # Enum Estado (PENDIENTE, EN_PROGRESO, COMPLETADA)
│   ├── Task.ts          # Modelo de tarea
│   └── User.ts          # Modelo de usuario
├── Persistence/         # Comunicación con la base de datos via Prisma
├── Service/             # Interfaces e implementaciones de la lógica de negocio
├── Types/               # Extensión de tipos de Express (Request con usuario autenticado)
├── Validators/          # Esquemas de validación con Zod
└── index.ts             # Punto de entrada de la aplicación
```

**Flujo de una petición:**
```
Cliente → Route → Middleware (auth) → Controller → Service → Persistence (Prisma) → PostgreSQL
```
---

## Tecnologías

- **Runtime:** Node.js
- **Framework:** Express.js
- **Lenguaje:** TypeScript
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** JSON Web Tokens + bcrypt
- **Validación:** Zod
- **Documentación:** Swagger (swagger-ui-express)
- **Fechas:** Luxon

---

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL corriendo localmente
- npm

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd api-gestion-tareas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Abre el archivo `.env` y completa los valores según la sección de configuración más abajo.

### 4. Ejecutar migraciones de base de datos

```bash
npx prisma migrate dev
```

### 5. Levantar el servidor

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
# Puerto del servidor
PORT=3000

# Conexión a PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/api_gestion_tareas"

# Secreto para firmar los JWT
JWT_SECRET="tu_secreto_seguro_aqui"

# Expiración del token (ej: 1d, 7d, 2h)
JWT_EXPIRES_IN="1d"
```
---

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión y obtener token JWT | No |

### Tareas

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/tasks` | Crear una nueva tarea | ✅ |
| GET | `/api/tasks` | Listar todas mis tareas | ✅ |
| GET | `/api/tasks/:id` | Consultar una tarea específica | ✅ |
| PUT | `/api/tasks/:id` | Actualizar una tarea | ✅ |
| DELETE | `/api/tasks/:id` | Eliminar una tarea | ✅ |

Para las rutas protegidas, incluir el token en el header:
```
Authorization: Bearer <token>
```

---

## Documentación Swagger

Con el servidor corriendo, accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## Scripts

```bash
npm run dev      # Servidor en modo desarrollo con hot-reload
npm run build    # Compilar TypeScript a JavaScript
npm start        # Ejecutar la versión compilada
```

---

## Modelo de datos

### Usuario
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | Identificador único |
| nombre | String | Nombre del usuario |
| email | String | Email único |
| password | String | Hash bcrypt |
| createdAt | DateTime | Fecha de creación |

### Tarea
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | Identificador único |
| titulo | String | Título de la tarea |
| descripcion | String | Descripción detallada |
| fechaVencimiento | DateTime | Fecha límite |
| estado | Estado | PENDIENTE / EN_CURSO / COMPLETADA |
| userId | Int | FK al usuario dueño |
| createdAt | DateTime | Fecha de creación |
| updatedAt | DateTime | Última actualización |
