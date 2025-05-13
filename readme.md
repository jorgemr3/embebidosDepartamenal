# API Sistema de Temperatura

## Instalación

```bash
cd api
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar:

  ```bash
  PORT=3000
  SERIAL_PORT=/dev/ttyUSB0
  ```

## Ejecución

- Modo desarrollo (con reinicio automático):

  ```bash
  npm run dev
  ```

- Modo producción:

  ```bash
  npm start
  ```
