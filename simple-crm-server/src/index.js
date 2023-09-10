import app from './app.js';
import 'dotenv/config'
import { sequelize, testDatabaseConnection } from './db/db-connection.js'

await testDatabaseConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});