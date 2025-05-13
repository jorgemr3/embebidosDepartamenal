import express from 'express';
import dotenv from 'dotenv';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';

dotenv.config();
const app = express();
app.use(express.json());

const portName = process.env.SERIAL_PORT;
const linePort = new SerialPort(portName, { baudRate: 9600 });
const parser = linePort.pipe(new Readline({ delimiter: '\n' }));
let latest = { t: null, h: null, act: null };

parser.on('data', line => {
  if (line.trim() === 'ERR') return;
  const [t, h, act] = line.split(',').map(Number);
  latest = { t, h, act: !!act };
});

import temperatureRouter from './routes/temperature.js';
app.use('/api', temperatureRouter(latest, linePort));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));

// routes/temperature.js
import { Router } from 'express';
export default function(latestData, serialPort) {
  const router = Router();

  // GET /api/temperature
  router.get('/temperature', (req, res) => res.json(latestData));

  // POST /api/setpoint
  router.post('/setpoint', (req, res) => {
    const { setpoint } = req.body;
    if (typeof setpoint !== 'number') {
      return res.status(400).json({ error: 'setpoint debe ser numérico' });
    }
    serialPort.write(`SP=${setpoint}\n`);
    res.json({ status: 'ok', setpoint });
  });

  return router;
}
