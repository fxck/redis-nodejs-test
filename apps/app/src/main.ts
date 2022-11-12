import { createClient } from 'redis';
import * as express from 'express';

const app = express();
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected!'));

app.get('/api', async (_, res) => {
  await client.set('time', 'value');
  const value = await client.get('time');

  res.send({ message: `Welcome to app! ${value}` });
});

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
