## Queue Management System

A modern queue management application built with a frontend-backend architecture, featuring real-time updates and Docker support.
Features

### Real-time queue updates via WebSocket connections

Modern web interface
RESTful API backend
Docker containerization support
Easy development setup

### Prerequisites

Before you begin, ensure you have the following installed:

Node.js (v16 or higher)
npm or yarn
Docker (optional, for containerized deployment)
Git

### Installation & Setup

1. Clone the Repository
   git clone https://github.com/SsagarikaR/queue-management.git
   cd queue-management
2. Frontend Setup
   Navigate to the frontend directory and install dependencies:
   cd frontend
   npm install

#### Environment Configuration

Create a .env file in the frontend directory:
VITE_WS_URL=ws://localhost:8080
VITE_API_URL=http://localhost:3000/api
Start Frontend Development Server
npm run dev
The frontend will be available at http://localhost:5173 (or the port shown in your terminal). 3. Backend Setup
Navigate to the backend directory and install dependencies:
cd ../backend
npm install

#### Environment Configuration

Create a .env file in the backend directory:
DB_NAME=queue_management
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost

Start Backend Development Server
npm run dev
The backend API will be available at http://localhost:3000.

## Docker Deployment

For a quick setup using Docker, navigate to the root directory and run:
docker-compose up --build
This will start both frontend and backend services along with any required databases.
To run in detached mode:
docker-compose up -d
To stop the services:
docker-compose down
