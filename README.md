Welcome to the hands-on project for **30 Days of DevOps**! 🚀

## About This Project

This repository contains a sample full-stack application designed specifically for learners following the [30 Days of DevOps newsletter](https://tadevopsit.brahimelhoube.com). This project serves as your practical playground to apply the DevOps concepts you've been learning over the past weeks.

### What You've Learned So Far

Over the course of your DevOps journey, you've explored:
- DevOps fundamentals and culture
- Version control with Git
- Containerization with Docker
- Container orchestration with Kubernetes
- Monitoring and observability
- CI/CD pipelines
- Infrastructure as Code
- Cloud platforms and deployment strategies

Now it's time to put it all together!

## Application Architecture

This is a modern three-tier web application that mirrors real-world production setups:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │     Backend     │    │     Database    │
│    (React)      │◄──►│   (Express.js)  │◄──►│   (PostgreSQL)  │
│   Port: 3001    │    │    Port: 3000   │    │    Port: 5432   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components

1. **Frontend** (`/frontend`)
   - React-based user interface
   - Modern, responsive design
   - Communicates with backend API

2. **Backend** (`/backend`)
   - Express.js REST API
   - Handles business logic and data processing
   - Connects to PostgreSQL database

3. **Database**
   - PostgreSQL for reliable data storage
   - Structured data with relationships

## Your Mission

Your goal is to take this application through a complete DevOps transformation:

1. **Containerize** each component using Docker
2. **Orchestrate** the services using Docker Compose or Kubernetes
3. **Deploy** to a cloud platform (AWS, Azure, or GCP)
4. **Implement** a CI/CD pipeline for automated deployments
5. **Monitor** your application in production

## Getting Started

### Prerequisites

Make sure you have these tools installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- A code editor (VS Code recommended)

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ElhoubeBrahim/tadevopsit-project
   cd tadevopsit-project
   ```

2. **Set up the database**
   ```bash
   # Using Docker (recommended)
   docker run --name tadevopsit-postgres-db \
     -e POSTGRES_DB=projectdb \
     -e POSTGRES_PASSWORD=password \
     -p 5432:5432 \
     -d postgres
   ```

3. **Start the backend**
   Check the [backend/README.md](backend/README.md) for detailed instructions.

4. **Start the frontend**
    Check the [frontend/README.md](frontend/README.md) for detailed instructions.

5. **Visit your application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

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
