import express from 'express';
import { configGraphQL } from './config/graphql'
import { syncDb } from './db/config/sequelize';

const app = express();

configGraphQL(app);

syncDb()
.then(v => {
app.listen(4800, () => console.log('Server started'));
})
.catch(err => console.log(err));