# Ricardo Test

## Setup

1. Install latest Node version
2. Install Docker Compose
3. run `docker compose up`. This will boot the Postgres database container.
4. Open another terminal
5. Run `npm install`.
6. Run `npm run dev`. This start the backend server.
10. You can now make API calls to `http://localhost:3001/api/`

### Endpoints:
- GET http://localhost:3001/api/accounts/:userEmail
- POST http://localhost:3001/api/transactions/:userEmail/send
- POST http://localhost:3001/api/transactions/:userEmail/receive

### FEATURES:
- Backend and DB balance validation
- Row lock to ensure multiple users update the same record correctly
- DB atomic transaction to avoid transactions/balance issues
- Avoid ORM to use simple DB connector

### TODO:

- Add DB indexes
- Enable https
- Enable CI/CD
- Add logger
- Use sequelize or other ORM
- Add security
- Add periodical balance so we don't need to process all transactions
