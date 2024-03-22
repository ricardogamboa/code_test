# Ricardo Test

## Setup

1. Install latest Node version
2. Install Docker Compose
3. run `docker compose up`. This will boot the Postgres database container.
4. Open another terminal
5. Run `npm install`.
6. Run `npm run dev`. This start the backend server.
10. You can now make API calls to `http://localhost:3001/api/`

### TODO:

- Enable https
- Enable CI/CD
- Add logger
- Use sequelize or other ORM
- Add security
- Add periodical balance so we don't need to process all transactions
