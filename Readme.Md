# Project Setup

This guide provides instructions to set up and run the project for both the frontend and backend.

---

git clone [<your-backend-repo-url>](https://github.com/SsagarikaR/queue-management)

### Frontend

cd frontend
npm i

## Environment Variables

Create a `.env` file in the `frontend` directory and add the following variables:

```env
VITE_WS_URL
VITE_API_URL
```

Start the frontend server:
npm run dev

### backend

cd frontend

## Environment Variables

Create a `.env` file in the `frontend` directory and add the following variables:

```env
DB_NAME
DB_USER
DB_PASSWORD

```

Start the backend server:
npm run dev

## Running with Docker

Navigate to the root directory.

Run the following command:

docker-compose up
