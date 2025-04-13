# Running the Project with Docker

This section provides instructions to set up and run the project using Docker and Docker Compose.

## Requirements

- Docker version 20.10 or higher
- Docker Compose version 1.29 or higher

## Environment Variables

The following environment variables are required:

- `POSTGRES_USER`: Username for the PostgreSQL database (default: `user`)
- `POSTGRES_PASSWORD`: Password for the PostgreSQL database (default: `password`)

## Build and Run Instructions

1. Clone the repository and navigate to the project directory.
2. Build and start the services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the application at `http://localhost:3000`.

## Service Configuration

- **App Service**:
  - Exposed Port: `3000`
  - Base Image: `node:22.13.1-slim`
- **Database Service**:
  - Exposed Port: None (internal use only)
  - Image: `postgres:latest`

## Notes

- Ensure the `.env` file is correctly configured if used.
- The application is built in a multi-stage Dockerfile for optimized production deployment.

For further details, refer to the existing documentation in the repository.