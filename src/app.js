import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

app.use(errorHandler);

export default app;
