# Bitácora de Desarrollo — API Gestión de Tareas

---
## 1. Proceso del Desarrollo de la API

El desarrollo se comenzó construyendo desde la base hacia arriba, garantizando que cada capa estuviera estable antes de avanzar a la siguiente.

**Configuración inicial del entorno:**

Lo primero fue instalar y configurar Node.js, Express y TypeScript, junto con el archivo `.env` para las variables de entorno, ya que toda la aplicación depende de esa base. Después se creó la estructura de carpetas del proyecto, definiendo desde el inicio la separación en capas.

**Conexión a la base de datos:**

Se instaló y configuró Prisma con PostgreSQL. Antes de continuar, se verificó que la conexión funcionara correctamente y que el servidor levantara sin errores. No avanzar con lógica encima de una base inestable fue una decisión consciente para evitar mezclar errores de configuración con errores de lógica.

**Modelo de datos:**

Con la conexión estable, se definieron las dos entidades principales (`User` y `Task`), sus relaciones y el enum `Estado` tanto en `src/Model/` como en el `schema.prisma`. Se ejecutaron las migraciones y se verificó directamente en PostgreSQL que las tablas se crearon correctamente.

**Configuración centralizada y middleware de autenticación:**

Se creó la configuración centralizada del proyecto y el middleware de validación JWT, que intercepta las rutas protegidas, verifica el token desde el header `Authorization: Bearer <token>` y expone el usuario autenticado en `req.user`.

**Capas de la aplicación:**

Con la base lista, se construyó la aplicación de adentro hacia afuera siguiendo este orden:

1. `Exception/` — clases de error personalizadas y middleware global de manejo de errores
2. `Config/` — configuración centralizada de la aplicación y conexión a base de datos
3. `Api/` — definición base de rutas y middlewares
4. `Persistence/` — métodos de acceso a la base de datos con Prisma
5. `Dto/` — estructuras de entrada y salida por entidad
6. `Services/` — lógica de negocio, implementando interfaces definidas previamente
7. `Types/` — extensiones de tipos de librerías externas
8. `Controllers/` — atención de peticiones, delegando al servicio correspondiente
9. `Validators/` — esquemas de validación de entradas
10. `Routes/` — definición de rutas y conexión con los controllers, encadenando `.catch(next)` para el manejo de errores async

**Validaciones y manejo de errores:**

Las validaciones de entrada se integraron sobre las rutas ya funcionales. El sistema de manejo de errores centralizado (`GlobalException` + `ErrorMessage`) se diseñó e integró en paralelo al desarrollo de los endpoints.

**Documentación:**

Se fue documentando con JSDoc a lo largo del desarrollo. Al final se integró Swagger para documentar todos los endpoints de forma estructurada.

---

## 2. Uso de Asistentes de IA

Usé la IA Claude como herramienta de aprendizaje durante el desarrollo. La prueba técnica definía qué construir y los conceptos detrás como: autenticación con JWT, separación en capas, manejo de errores centralizado, etc. Los entendía porque vengo de Java. El reto fue implementarlos en un stack que no había usado antes: TypeScript con Node.js y Express. Ahí fue donde me apoyé en la IA, para entender cómo se hacen esas cosas en este ecosistema.

---

### Uso 1 — Estructurar el proyecto en TypeScript viniendo de Java

**Prompt utilizado:**
> "Tengo experiencia en Java. ¿Cómo se estructura un proyecto Express con TypeScript siguiendo una arquitectura en capas similar a controllers, services y repositories? ¿Qué archivos de configuración necesito para que TypeScript funcione con Node.js?"

**Qué se aceptó y por qué:**
Me explicó bien el `tsconfig.json` y opciones clave como `strict`, `outDir`, `rootDir` y `esModuleInterop`. También `ts-node-dev` para hot-reload en desarrollo, equivalente al DevTools de Spring Boot. Lo adopté porque son estándares del ecosistema.

**Qué se rechazó o modificó:**
La IA propuso una estructura plana con pocos archivos. No la usé por que la prueba exige separación en capas y además es la forma correcta de organizar el proyecto. Terminé con `Api/`, `Controller/`, `Service/`, `Persistence/`, `Config/`, `Dto/`, `Model/`, `Exception/`, `Types/` y `Validators/`, cada una con una responsabilidad clara.

**Verificación realizada:**
Antes de escribir cualquier lógica de negocio verifiqué que el proyecto compilara sin errores, que la conexión a PostgreSQL funcionara y que el servidor levantara con `npm run dev`.

---

### Uso 2 — Extender el objeto Request de Express con TypeScript

**Prompt utilizado:**
> "En Express con TypeScript, ¿cómo agrego una propiedad personalizada al objeto `req` dentro de un middleware de autenticación? En Java esto sería un atributo del contexto de la petición, pero no sé cómo hacerlo aquí."

**Qué se aceptó y por qué:**
La técnica de *declaration merging* con un archivo en `Types/` para extender la interfaz `Request` de Express fue la solución correcta y la usé. Es el patrón estándar de TypeScript para añadir propiedades a tipos de librerías externas.

**Qué se rechazó o modificó:**
La IA tipó el usuario como `any`. Lo rechacé de inmediato por que usar `any` es decirle a TypeScript que se desentienda de ese valor, lo cual anula el propósito del tipado estático. Definí una interfaz explícita con los campos reales que uso (`id` y `email`).

**Verificación realizada:**
Confirmé que el compilador no lanzaba errores al acceder a `req.user.id` en los controllers protegidos.

---

### Uso 3 — Configurar Prisma con PostgreSQL

**Prompt utilizado:**
> "¿Cómo se configura Prisma en TypeScript con PostgreSQL? ¿Cómo defino los modelos y ejecuto las migraciones? Vengo de usar JPA/Hibernate en Java y quiero entender las diferencias."

**Qué se aceptó y por qué:**
La estructura del `schema.prisma` y el flujo de `npx prisma migrate dev` lo adopté. El patrón de instanciar `PrismaClient` una sola vez también tiene sentido — es similar a no crear una `EntityManagerFactory` nueva por cada operación en JPA.

**Qué se rechazó o modificó:**
La IA puso la instancia de Prisma en `index.ts`. La moví a `src/Config/Prisma.ts` porque la gestión de la conexión a base de datos no es responsabilidad del punto de entrada de la aplicación.

**Verificación realizada:**
Ejecuté `npx prisma migrate dev` y revisé directamente en PostgreSQL que las tablas se crearon correctamente con todas sus columnas y relaciones antes de continuar.

---

## 3. Decisiones Tomadas Sin Asistencia de IA

### Decisión 1 — El sistema de manejo de errores: `ErrorMessage` + `GlobalException`

Esta fue una decisión completamente mía, inspirada en cómo se maneja en Java pero adaptada a TypeScript y Express.

Diseñé dos clases en `src/Exception/`: `ErrorMessage`, que estructura la información del error (timestamp con Luxon, status HTTP, tipo y mensaje), y `GlobalException`, que extiende `Error` y expone métodos estáticos para crear los errores más comunes de forma clara:

```typescript
static notFoundException(message = 'Recurso no encontrado'): GlobalException {
    return new GlobalException(404, 'Not Found', message);
}
static badRequestException(message = 'Solicitud inválida'): GlobalException {
    return new GlobalException(400, 'Bad Request', message);
}
static unauthorizedException(message = 'No autorizado'): GlobalException {
    return new GlobalException(401, 'Unauthorized', message);
}
```

El método `handleException` funciona como middleware global de Express: si el error es una instancia de `GlobalException`, extrae el `ErrorMessage` y responde con el formato estándar incluyendo `status`, `path`, `typeError`, `message` y `timestamp`. Si no lo es, responde con un 500 genérico. Esto garantiza que cualquier error en la aplicación siempre llegue al cliente con la misma estructura JSON.

### Decisión 2 — Interfaces de servicio, modelos, el enum `Estado` y los DTOs

Definí todo el modelo de datos sin asistencia: las entidades en `src/Model/` (`User.ts`, `Task.ts`), el enum `Estado.ts` en `src/Model/Enum/` con los valores `PENDIENTE`, `EN_CURSO` y `COMPLETADA`, y todos los DTOs en `src/Dto/` separados por entidad (`TaskDto/`, `UserDto/`) con sus variantes de request y response.

También definí interfaces de servicio (`ITaskService`, `IUserService`) que las implementaciones concretas (`TaskServiceImpl`, `UserServiceImpl`) deben cumplir. Es un patrón que conozco de Java, también programar contra interfaces en lugar de implementaciones concretas hace el código más desacoplado y fácil de modificar. En los controllers instancio directamente la implementación, pero la dependencia declarada es la interfaz, Usando el paradigma de programación POO.

---

## 4. Retos y Soluciones

### Reto principal — Venir de Java: la configuración inicial me consumió demasiado tiempo

El mayor obstáculo no fue entender la lógica de la API, sino el cambio de ecosistema. En Java con Spring Boot uno arranca rápido: Spring Initializer genera la estructura, las anotaciones hacen gran parte del trabajo y hay convención sobre configuración en casi todo. En Node.js con TypeScript todo es manual desde el principio.

Me trabé bastante tiempo configurando `tsconfig.json` correctamente, entendiendo la diferencia entre `CommonJS` y `ESModules`, haciendo que `ts-node-dev` reconociera los paths del proyecto, y entendiendo cómo Express maneja el ciclo de vida de una petición sin el contexto automático que da Spring. Esto me dejó con menos tiempo del que quería para el desarrollo de los endpoints.

La solución fue no avanzar hasta tener la base estable: levanté primero un servidor mínimo, verifiqué que compilara y respondiera, y solo ahí continué. Mezclar errores de configuración con errores de lógica habría sido mucho más difícil de depurar.

### Reto 2 — Los errores async no llegaban al middleware de Express

Express no captura automáticamente los errores lanzados dentro de funciones `async`. Al principio, cuando lanzaba un `GlobalException` desde un controller, el error no llegaba al `handleException` y la aplicación quedaba sin responder. En Spring esto no pasa porque `@ExceptionHandler` intercepta las excepciones automáticamente.

La solución fue encadenar `.catch(next)` directamente en cada definición de ruta, pasando el error al middleware global de Express:

```typescript
router.post("/tasks", (req, res, next) =>
  taskController.createTask(req, res, next).catch(next)
);
```

Así todos los errores, sin excepción, llegan al `GlobalException.handleException` con el formato de respuesta correcto.
