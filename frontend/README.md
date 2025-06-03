This is the frontend user interface for the DevOps learning project, built with React and modern web technologies.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see [backend README](../backend/README.md) for setup)

## Environment Setup

1. **Copy the environment template**

   ```bash
   cp .env.example .env
   ```

2. **Configure your environment variables**

   ```bash
   VITE_API_URL=http://localhost:3000/api
   ```

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3001

## Troubleshooting

### Common Issues

#### 1. API Connection Errors

**Problem**: `Network Error` or `CORS policy` errors

**Solutions**:

- Ensure backend is running on port 3000:
  ```bash
  curl http://localhost:3000/api/health
  ```
- Check your `.env` file has correct API URL:
  ```bash
  REACT_APP_API_URL=http://localhost:3000
  ```
- Restart both frontend and backend after env changes

#### 2. Port Already in Use

**Problem**: `Something is already running on port 3001`

**Solutions**:

- Kill the process using port 3001:

  ```bash
  # Find the process
  lsof -i :3001

  # Kill it (replace PID with actual process ID)
  kill -9 <PID>
  ```

- Or start on a different port:
  ```bash
  PORT=8080 npm start
  ```

#### 3. Module Resolution Errors

**Problem**: `Module not found: Can't resolve 'component-name'`

**Solutions**:

- Check file paths and import statements
- Ensure components are exported correctly:

  ```javascript
  // In component file
  export default ComponentName;

  // In importing file
  import ComponentName from "./path/to/ComponentName";
  ```

- Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

#### 4. Environment Variables Not Working

**Problem**: `process.env.VITE_*` is undefined

**Solutions**:

- Ensure variables start with `VITE_`:

  ```bash
  # ✅ Correct
  VITE_API_URL=http://localhost:3000

  # ❌ Incorrect (won't work)
  API_URL=http://localhost:3000
  ```

- Restart development server after changing `.env`
- Check `.env` file is in the frontend directory (not project root)

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
