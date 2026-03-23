import dotenv from "dotenv";

/**
 * Archivo de entrada principal de la aplicación, carga las variables de entorno utilizando dotenv
 * Importa y ejecuta la configuración de la aplicación. 
 * Inicia el servidor en el puerto especificado en las variables de entorno.
 */
dotenv.config();

const { default: app } = await import('./Config/App.js');
const { default: envConfig } = await import('./Config/env.config.js');

// Iniciamos el servidor
app.listen(envConfig.port, () => {
  console.log(`Servidor en http://localhost:${envConfig.port}`)
});