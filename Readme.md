# CRUD API

A simple application that implements a CRUD (Create, Read, Update, Delete) API using Node.js, TypeScript, and UUID.

## 📦 Description

This project demonstrates a RESTful CRUD API built with TypeScript and Node.js without external frameworks like Express. It supports creating, reading, updating, and deleting entities identified by UUIDs.

## 🚀 Technologies Used

- Node.js (ES Modules)
- TypeScript
- UUID
- dotenv
- ts-node (for development)
- nodemon (for hot-reloading)

## 📜 Scripts

| Script        | Description                                                  |
|---------------|--------------------------------------------------------------|
| `start`       | Runs the compiled JavaScript from the `dist/` folder         |
| `start:prod`  | Compiles the project using TypeScript (`tsc`)                |
| `start:dev`   | Runs the development server with `nodemon` and `ts-node`     |

## 🛠 Installation & Usage

```bash
# Clone the repository
git clone https://github.com/DmitryLotkov/simple-CRUD-API
cd simple-CRUD-API

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Build TypeScript -> JavaScript
npm run start:prod

# Run production code
npm start


