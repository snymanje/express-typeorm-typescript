export default {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      version: '1.0',
      title: 'Node\\Express starter project with Authentication and Autherization',
      description: 'Using Express, TypeORM, SQLite and TypeScript',
      contact: {
        name: 'Jean Snyman',
        email: 'jeansn@tfg.co.za'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1'
      }
    ]
  },
  apis: ['**/*.ts']
};
