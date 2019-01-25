import express from 'express';
import { configGraphQL } from './config/graphql'

const app = express();

configGraphQL(app);

app.listen(4800, () => console.log('Server started'));