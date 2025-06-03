# Queue Management System

A modern queue management application built with a frontend-backend architecture, featuring real-time updates and Docker support.

## Features

**Real-time queue updates via WebSocket connections**

1. Modern web interface
2. RESTful API backend
3. Docker containerization support
4. Easy development setup

## Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js (v16 or higher)
2. npm or yarn
3. Docker (optional, for containerization)
4. Git

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SsagarikaR/queue-management.git
cd queue-management
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Environment Configuration

Create a `.env` file in the frontend directory:

```
VITE_WS_URL=ws://localhost:4000
VITE_API_URL=http://localhost:4000/api
```

#### Start Frontend Development Server

```bash
npm run dev
```

The frontend will be available at http://localhost:5173 (or the port shown in your terminal).

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd ../backend
npm install
```

#### Environment Configuration

Create a `.env` file in the backend directory:

```
DB_NAME=queue_management
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
```

#### Start Backend Development Server

```bash
npm run dev
```

The backend API will be available at http://localhost:4000.

## Docker Deployment

For a quick setup using Docker, navigate to the root directory and run:

```bash
docker-compose up --build
```

This will start both frontend and backend services along with any required databases.

To run in detached mode:

```bash
docker-compose up -d
```

To stop the services:

```bash
docker-compose down
```
