import express from 'express';
import pg from 'pg';
import { Connector, AuthTypes, IpAddressTypes } from '@google-cloud/cloud-sql-connector';

const { Pool } = pg;

const connector = new Connector();
const clientOpts = await connector.getOptions({
  // instanceConnectionName: process.env.CONNECTION_NAME,
  instanceConnectionName: process.env.CONNECTION_NAME,
  ipType: IpAddressTypes.PUBLIC,
  authType: AuthTypes.PASSWORD,
});
// console.log(clientOpts);
// console.log('HELLOOOOO!!!');

const pool = new Pool({
  ...clientOpts,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PW,
});

const app = express();

app.get('/', async (req, res) => {
  const time = await pool.query('SELECT NOW();');
  console.log(time.rows[0]);
  res.json({ status: 'active', data: { time: time.rows[0] } });
});

app.listen(3000, () => {
  console.log('Awesome time app listening on port 3000');
});
// await pool.end();
// connector.close();
