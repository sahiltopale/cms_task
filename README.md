# Content Management System (CMS)

A lightweight full-stack Content Management System built with React, TypeScript, Node.js, Express, PostgreSQL, and Sequelize ORM.

The application allows authenticated users to create, manage, publish, and maintain multiple versions of their content. Every update creates a new version instead of overwriting existing data, providing complete version history and restore capabilities.

---

# Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [Version Control System](#version-control-system)
- [Authentication & Security](#authentication--security)
- [API Documentation](#api-documentation)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Technical Decisions](#technical-decisions)
- [Future Improvements](#future-improvements)

---

# Project Overview

This CMS provides a complete platform for managing digital content.

Users can:

- Register and login securely
- Create blog posts
- Edit existing content
- Maintain complete version history
- Compare different versions
- Restore previous versions
- Publish or unpublish content
- View published blogs publicly

The main focus of this project is implementing a reliable content versioning system where no previous content is lost.

---

# Features

## Authentication

### User Registration

Users can create an account using:

- Name
- Email
- Password

Passwords are securely encrypted before storing them in the database.

---

### User Login

Implemented using:

- JWT Authentication
- Protected API routes
- Token-based session management

Authenticated users can access only their own posts and version history.

---

# Content Management

## Create Posts

Users can create new content with:

- Title
- Content JSON
- Automatic slug generation
- Draft status by default

Example:

```
Title:
React Basics

Slug:
react-basics-a23fd4
```

---

## Edit Posts

When a user edits a post:

- Existing data is not overwritten
- A new version record is created
- Complete history is maintained

Example:

```
Version 1
----------
React Introduction


Version 2
----------
React Advanced Concepts


Version 3
----------
React Hooks
```

---

## Delete Posts

Users can permanently delete:

- Post data
- Associated versions

---

## Publish / Unpublish

Users can change post visibility:

```
Draft
 |
Publish
 |
Published
 |
Unpublish
 |
Draft
```

---

# Version Control System

One of the main features of this CMS is content versioning.

Instead of updating the same record repeatedly, every modification creates a new entry in the `PostVersions` table.

Example:

```
Posts Table

id
slug
status
authorId



PostVersions Table


id
postId
title
contentJson
authorId
createdAt

```

Benefits:

- Previous content is preserved
- Users can view complete history
- Rollback functionality is possible
- Changes can be compared

---

# Version Comparison

The system supports comparing two different versions.

Example:

Version 1:

```
Frontend
```

Version 2:

```
Backend
```

Comparison Output:

```
Removed:
Frontend


Added:
Backend
```

Implemented using:

```
diff-match-patch
```

library.

---

# Restore Version

Users can restore any previous version.

When restoring:

- Old version is not deleted
- A new version entry is created
- The restored content becomes the latest version

Example:

```
Version History


v1
React Basics


v2
React Hooks


Restore v1


New Version Created


v3
React Basics
```

---

# Technology Stack

## Frontend

| Technology   | Purpose           |
| ------------ | ----------------- |
| React        | User interface    |
| TypeScript   | Type safety       |
| React Router | Navigation        |
| Axios        | API communication |
| CSS          | Styling           |

---

## Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime             |
| Express.js | Backend framework   |
| TypeScript | Type safety         |
| JWT        | Authentication      |
| bcrypt     | Password encryption |
| Sequelize  | ORM                 |

---

## Database

| Technology    | Purpose             |
| ------------- | ------------------- |
| PostgreSQL    | Relational database |
| Sequelize ORM | Database operations |

---

# Application Architecture

```
Client
 |
 |
React + TypeScript
 |
 |
Axios API Requests
 |
 |
Express Backend
 |
 |
Sequelize ORM
 |
 |
PostgreSQL Database

```

---

# Project Structure

## Backend

```
backend
│
├── src
│   │
│   ├── controllers
│   │      ├── authController.ts
│   │      └── postController.ts
│   │
│   ├── models
│   │      ├── User.ts
│   │      ├── Post.ts
│   │      └── PostVersion.ts
│   │
│   ├── routes
│   │      ├── authRoutes.ts
│   │      └── postRoutes.ts
│   │
│   ├── middleware
│   │      └── authMiddleware.ts
│   │
│   ├── seeds
│   │      └── seedPosts.ts
│   │
│   └── server.ts
│
├── package.json
└── tsconfig.json

```

---

## Frontend

```
frontend
│
├── src
│   │
│   ├── pages
│   │      ├── Login.tsx
│   │      ├── Register.tsx
│   │      ├── Dashboard.tsx
│   │      ├── CreatePost.tsx
│   │      ├── EditPost.tsx
│   │      ├── Versions.tsx
│   │      └── VersionDiffPage.tsx
│   │
│   ├── api
│   │      └── axios.ts
│   │
│   ├── styles
│   │      ├── dashboard.css
│   │      └── versions.css
│   │
│   └── App.tsx
│

```

---

# Database Design

## Users Table

Stores authentication information.

Fields:

```
id
name
email
password
createdAt
updatedAt
```

---

## Posts Table

Stores main post information.

Fields:

```
id
slug
status
authorId
createdAt
updatedAt
```

Relationship:

```
User
 |
 | One-to-Many
 |
Posts

```

---

## PostVersions Table

Stores every content change.

Fields:

```
id
postId
title
contentJson
authorId
createdAt
updatedAt

```

Relationship:

```
Post
 |
 | One-to-Many
 |
PostVersions

```

---

# Authentication & Security

Implemented security features:

## Password Hashing

Passwords are encrypted using:

```
bcrypt
```

Before storing:

```
Plain Password

      ↓

bcrypt hashing

      ↓

Database
```

---

## JWT Authentication

Protected routes require:

```
Authorization: Bearer TOKEN

```

Example:

```
GET /posts/my-posts

Authorization:
Bearer eyJhbGciOiJIUzI1...

```

---

# API Documentation

## Authentication APIs

### Register User

```
POST /auth/register
```

Body:

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

### Login User

```
POST /auth/login

```

---

# Post APIs

## Create Post

```
POST /posts
```

---

## Get User Posts

```
GET /posts/my-posts

```

---

## Update Post

```
PUT /posts/:postId

```

Creates a new version.

---

## Delete Post

```
DELETE /posts/:postId

```

---

## Publish Post

```
PATCH /posts/:postId/publish

```

---

## Unpublish Post

```
PATCH /posts/:postId/unpublish

```

---

# Version APIs

## Get Versions

```
GET /posts/:postId/versions

```

---

## Get Single Version

```
GET /posts/version/:versionId

```

---

## Compare Versions

```
GET /posts/compare/:version1Id/:version2Id

```

---

## Restore Version

```
POST /posts/restore/:versionId

```

---

# Installation & Setup

## Prerequisites

Install:

- Node.js
- PostgreSQL
- npm

Check versions:

```
node -v

npm -v

```

---

# Backend Setup

Navigate:

```
cd backend

```

Install dependencies:

```
npm install

```

Create `.env` file:

```
PORT=5000

DATABASE_NAME=cms

DATABASE_USER=postgres

DATABASE_PASSWORD=password

DATABASE_HOST=localhost

JWT_SECRET=your_secret_key

```

Run server:

```
npm run dev

```

Backend runs on:

```
http://localhost:5000

```

---

# Frontend Setup

Navigate:

```
cd frontend

```

Install dependencies:

```
npm install

```

Run application:

```
npm run dev

```

Frontend runs on:

```
http://localhost:5173

```

---

# Seeding Database

## Seed Demo Data

To populate the database with sample users, posts and versions:

```bash
cd backend

npm run seed

---

# Technical Decisions

## Why PostgreSQL?

PostgreSQL was selected because:

- Strong relational structure
- Reliable transactions
- Good JSON support
- Suitable for CMS data

---

## Why Sequelize?

Sequelize provides:

- Easier database management
- Model-based development
- Relationship handling
- Query abstraction

---

## Why Version-Based Editing?

Traditional CMS:

```

Update existing row

Old content lost

```

Implemented approach:

```

Create new version

Old content preserved

```

Advantages:

- History tracking
- Rollback support
- Better data safety

---

# Future Improvements

Possible enhancements:

## Rich Text Editor

Support editors like:

- TipTap
- Editor.js
- Draft.js

---

## Auto Save

Automatically save drafts while editing.

---

## Role Based Access

Example:

```

Admin

Editor

Viewer

```

---

## Media Upload

Support:

- Images
- Videos
- Files

---

## Advanced Search

Add:

- Full text search
- Filters
- Tags

---

## Deployment

Deploy using:

Frontend:

- Vercel

Backend:

- Render
- AWS

Database:

- PostgreSQL Cloud

---

# Author

Developed as part of a CMS Full Stack Development Assignment.

Technology Stack:

```

React + TypeScript
Node.js + Express
PostgreSQL
Sequelize
JWT Authentication

```

```
