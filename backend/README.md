This is the backend API for the DevOps learning project, built with Express.js and PostgreSQL.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (local or Docker)

## Environment Setup

1. **Copy the environment template**
   ```bash
   cp .env.example .env
   ```

2. **Configure your environment variables**
   ```bash
   DATABASE_URL=postgres://postgres:password@localhost:5432/projectdb
   ```

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start PostgreSQL** (if not already running)
   ```bash
   # Using Docker (recommended)
   docker run --name tadevopsit-postgres-db \
     -e POSTGRES_DB=projectdb \
     -e POSTGRES_PASSWORD=password \
     -p 5432:5432 \
     -d postgres
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

The API will be available at http://localhost:3000

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solutions**:
- Ensure PostgreSQL is running:
  ```bash
  # Check if PostgreSQL is running
  docker ps | grep postgres
  
  # If not running, start it
  docker start tadevopsit-postgres-db
  ```
- Verify your `.env` database credentials match your PostgreSQL setup
- Check if the database exists:
  ```bash
  docker exec -it tadevopsit-postgres-db psql -U postgres -d projectdb
  ```

#### 2. Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:
- Kill the process using port 3000:
  ```bash
  # Find the process
  lsof -i :3000

  # Kill it (replace PID with actual process ID)
  kill -9 <PID>
  ```
- Or change the port in your `.env` file:
  ```bash
  PORT=5000
  ```

#### 3. Module Not Found Errors

**Problem**: `Error: Cannot find module 'express'`

**Solutions**:
- Ensure you've installed dependencies:
  ```bash
  npm install
  ```
- Clear npm cache if needed:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

#### 4. Environment Variables Not Loading

**Problem**: Database credentials showing as undefined

**Solutions**:
- Ensure `.env` file exists in the backend directory
- Check that variable names match exactly (no extra spaces)
- Restart the server after changing `.env` file

## Need Help?

- Check the component-specific README files for detailed setup instructions
- Review the troubleshooting sections for common issues
- Visit the [30 Days of DevOps website](https://tadevopsit.brahimelhoube.com) for additional resources
- Feel free to reach out if you run into any issues or have questions:
    - Instagram: [@brahim.elhoube](https://www.instagram.com/brahim.elhoube)
    - LinkedIn: [/in/elhoube-brahim](https://www.linkedin.com/in/elhoube-brahim/)
    - Mail: [brahim.elhoube@gmail.com](mailto:brahim.elhoube@gmail.com)
---

*Part of the 30 Days of DevOps journey - [tadevopsit.brahimelhoube.com](https://tadevopsit.brahimelhoube.com)*
