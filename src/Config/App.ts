import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { GlobalException } from '../Exception/GlobalException.js'
import UserRoute from '../Api/Route/UserRoute.js';
import TaskRoute from '../Api/Route/TaskRoute.js';

const app = express()

app.use(express.json())

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestión de Tareas',
      version: '1.0.0',
      description: 'API REST para gestión de tareas con autenticación JWT',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/Api/Route/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", UserRoute);
app.use("/api", TaskRoute);
app.use(GlobalException.handleException) 

export default app