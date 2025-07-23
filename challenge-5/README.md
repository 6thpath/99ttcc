# Pet Management

A Node.js backend built with Express, TypeORM, and PostgreSQL for managing pet data.  
Includes validation, modular architecture, and environment-based configuration.

## Project Structure

```
root/
│
├── dist/               # Compiled output
├── source/
│   ├── @types/         # global types
│   ├── config/         # Env setup, DB config
│   ├── controllers/    # Route handlers (token CRUD logic)
│   ├── middlewares/    # Auth, error, validations
│   ├── models/         # entity schemas or types
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── .env
├── .env.keys
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── pnpm-lock.yaml
└── README.md
├── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js >= 20
- ~~PostgreSQL database~~
- [pnpm](https://pnpm.io/) package manager

### Setup

1. **Install dependencies:**

   ```sh
   pnpm install
   ```

2. **Configure environment:**
   - (Required) Download and place it `.env.keys` at root.
   - (Optional) Decrypt with [dotenvx](https://dotenvx.com/) if you want to view env vars:
     ```sh
     pnpm run env:dec
     ```
   - (Optional) Edit `.env` if needed, then re-encrypt:
     ```sh
     pnpm run env:enc
     ```

3. **Run development server:**

   ```sh
   pnpm dev
   ```

4. **Build for production:**

   ```sh
   pnpm build
   ```

5. **Start production server:**
   ```sh
   pnpm start
   ```

### Scripts

- `dev` – Start server with hot reload
- `build` – Compile TypeScript
- `start` – Run compiled server
- `lint` – Format and lint code
- `env:dec` / `env:enc` – Decrypt/encrypt `.env` with dotenvx

## API Overview

- RESTful endpoints for managing pets (CRUD)
- Input validation with `express-validator`
- PostgreSQL via TypeORM

## API Specifications

### Base URL

```
/api/pets
```

### Authentication

_No authentication required (default)._

### Endpoints

#### List Pets

- **GET** `/api/pets`
- **Query Params:**
  - Filter conditions: `name` (string), `species` (string), `breed` (string)
  - Pagination: `offset` (int, default 0), `limit` (int, default 25, max 100)
  - Ordering: `order` (string, e.g. `?order=name:asc,breed:desc`)
- **Response:**
  - 200 Pet list, example:
  ```json
  {
    "data": [
      {
        "id": 4,
        "name": "c",
        "species": "c",
        "breed": "c",
        "createdAt": "2025-07-23T07:40:32.272Z",
        "updatedAt": "2025-07-23T07:40:32.272Z"
      },
      {
        "id": 3,
        "name": "b",
        "species": "b",
        "breed": null,
        "createdAt": "2025-07-23T06:11:46.394Z",
        "updatedAt": "2025-07-23T06:11:46.394Z"
      },
      {
        "id": 1,
        "name": "a",
        "species": "a",
        "breed": "a",
        "createdAt": "2025-07-22T10:55:13.846Z",
        "updatedAt": "2025-07-22T10:55:13.846Z"
      }
    ],
    "pagination": { "offset": 3, "limit": 25, "order": { "createdAt": "desc" }, "total": 6 }
  }
  ```

#### Get Pet by ID

- **GET** `/api/pets/:id`
- **Params:** `id` (int)
- **Possible Response:**
  - 200 Pet object
  - 404 Not Found

#### Create Pet

- **POST** `/api/pets`
- **Body:**
  ```
  {
    "name": "string",
    "species": "string (optional)",
    "breed": "string (optional)"
  }
  ```
- **Possible Response:**
  - 200 Created Pet object
  - 400 Bad request

#### Update Pet

- **PUT** `/api/pets/:id`
- **Params:** `id` (int)
- **Body:**  
  _Same as Create Pet_
- **Possible Responses:**
  - 200 Updated Pet object
  - 404 Not Found

#### Delete Pet

- **DELETE** `/api/pets/:id`
- **Params:** `id` (int)
- **Possible Responses:**
  - 204 No Content
  - 404 Not Found

### Response Format

#### Success

```json
{
  "data": { ... }
}
```

#### Error

```json
{
  "error": {
    "message": "Description",
    "details": { "field": "reason" }
  }
}
```

## Example Pet Object

```
{
  "id": 1,
  "name": "<NAME>",
  "species": "<SPECIES>",
  "breed": "<BREED>",
  "createdAt": "2025-07-23T04:09:00.000Z",
  "updatedAt": "2025-07-23T04:10:00.000Z"
}
```

## Notes

- All endpoints return JSON.

## License

MIT
