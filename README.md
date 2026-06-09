# CMS Assignment

## Overview

This project is a simple Content Management System (CMS) built using:

- React + TypeScript
- Node.js + Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication

The goal was to build a lightweight CMS that supports content creation, versioning, publishing, and user authentication.

---

## Features

### Authentication

- User registration
- User login
- JWT-based protected routes

### Content Management

- Create posts
- Edit posts
- Delete posts
- Publish posts
- View all user posts

### Version Control

Every edit creates a new version record.

No previous content is overwritten.

Users can view the complete version history of a post.

### Security

- Password hashing using bcrypt
- JWT authentication
- Protected backend routes

---

## Technical Decisions

### PostgreSQL

Chosen because it provides reliable relational storage and strong support for structured content.

### Sequelize ORM

Used to simplify database interactions and migrations.

### Versioning Strategy

Instead of updating a post directly, every edit creates a new entry in the PostVersions table. This preserves content history and allows rollback functionality in the future.

### React

Used for building a simple and maintainable frontend interface.

---

## Running The Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

- Rich text editor
- Draft autosave
- Role-based permissions
- Search and filtering
- Restore previous versions
