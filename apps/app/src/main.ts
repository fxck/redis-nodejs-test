import { createClient } from 'redis';
import * as express from 'express';

const app = express();

console.log('process env', process.env.db_connectionString);

const client = createClient({
  url: process.env.db_connectionString || 'redis://db:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected!'));

app.get('/api', async (_, res) => {
  await client.connect();
  await client.set('time', 'value');
  const value = await client.get('time');
  await client.disconnect();

  res.send({ message: `Welcome to app! ${value}` });
});

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
