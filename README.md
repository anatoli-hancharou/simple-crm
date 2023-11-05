
# SimpleCRM setup manual

> [!NOTE]
> The project was created using Node.js v18.17.0 and npm 9.4.0

1. Open **simple-crm-server** and **simple-crm-ui** folders inside your preferred IDE or editor. _All steps were tested in VS Code._
2. Run `npm install` command in the terminal of both applications to install all required packages.
3. Create database and migrate structure
   - Create empty database in SQL Server (MSSQL can be used).
   - Inside **simple-crm-server** project go to _/db-migrator_ folder.
   - Inside _config/config.json_ file change parameters within ***development*** (used by default) section to correspond your actual DB name, username, password and host (if different from localhost). 
   - Run `npx sequelize-cli db:migrate` command to apply migrations to your database.
4. Within **simple-crm-server** root directory you will find _.env-example_ file. On the same folder structure level create _.env_ file with the same parameters as in the example. Adjust values according your actual environment and needs.
   - Parameters starting from _DB__ should be the same as specified in the step #3.
   - _SECRET_KEY_ parameter is used to encyprt data in jwt token
   - _PORT_ indicates the port on which the server is running
   - _NODE_ENV_ leave _development_
   - _CORS_ALLOWED_ORIGINS_ should contain the origin of the UI application to allow requests from third party sources
5. Within **simple-crm-ui** root directory create _.env_ file with _REACT_APP_BACKEND_API_URL=http://localhost:4200_ parameter. Adjust value to the actual server origin.
6. Now you can run `npm run start` command within both projects root directories to start your application.
> [!NOTE]
> This project uses ORM tool `sequelize` that support various DB systems, such as Postgres, MySQL, MariaDB, SQLite, DB2, Microsoft SQL Server, and Snowflake. During the development `mssql` dialect was used and tested, but you can try database you like more (there may be diffrences in sequelize usage depending on DB system). To change dialect please specify `dialect` parameter in simple-crm-server/db/db-connection.js and simple-crm-server/db-migrator/config/config.js for db migration.

## Running tests

Run `npm test` command from **simple-crm-server** root directory to run unit tests as well as end-to-end tests defiened in the project. Tests use im-memory SQLite DB that is being created and deleted automatically. 

## Email notifications setup

To enable email notifications:
1. Go to simple-crm-server/.env file and set _ENABLE_NOTIFICATIONS_ to `true`.
2. Change parameters starting with _MAIL__ according to mail provider you're going to use. If you're using Gmail you'll need to specify only _MAIL_USER_ and _MAIL_PASSWORD_. Keep in mind that your primary password won't let the application get access to the account. You'll need to create [app password](https://support.google.com/mail/answer/185833?hl=en) and specify it instead.

If everything is configured correctly, the application will send emails to the users about their customers having a deadline less than 12 hours. 
