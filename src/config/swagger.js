import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Finance Data Processing API',
            version: '1.0.0',
            description: 'API for managing financial records with JWT-based Authentication.\n\n### To test:\n\n1. Use **/auth/login** to get a JWT token.\n\n   - **Admin**: `admin@example.com` / `admin123`\n\n   - **Analyst**: `analyst@example.com` / `analyst123`\n   - **Viewer**: `viewer@example.com` / `viewer123`\n2. copy the `token` from the response.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string', enum: ['viewer', 'analyst', 'admin'] },
                        status: { type: 'string', enum: ['active', 'inactive'] },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                FinancialRecord: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        userId: { type: 'integer' },
                        amount: { type: 'number' },
                        type: { type: 'string', enum: ['income', 'expense'] },
                        category: { type: 'string' },
                        date: { type: 'string', format: 'date-time' },
                        notes: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
