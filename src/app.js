import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import {createRoles} from './libs/initialSetup';

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';

const app = express();
createRoles();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

export default app;