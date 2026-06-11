Technical Decisions & Architecture Explanation

This document explains the major technical decisions made while building the CMS application and the reasoning behind them.

1. Rich Text Editor Selection
   Decision

The CMS uses TipTap Editor as the rich text editor.

Why TipTap?

TipTap was selected because it is a modern, headless rich text editor built on top of ProseMirror.

The main reasons for choosing TipTap are:

Provides structured document output instead of raw HTML.
Supports JSON-based content storage.
Highly customizable.
Easy integration with React and TypeScript.
Allows adding extensions such as:
Bold
Italic
Headings
Lists
Links
Images
Code blocks

Unlike traditional editors that directly generate HTML, TipTap maintains a structured document model which makes content manipulation easier.

Alternative Considered
HTML based editors

Examples:

CKEditor
TinyMCE

These editors store content mainly as HTML.

The disadvantages:

HTML parsing becomes difficult.
Comparing two versions becomes harder.
Formatting changes can create unnecessary differences.
Security concerns such as XSS require additional sanitization.

Therefore, TipTap was chosen because its JSON format is better suited for a version-controlled CMS.

2. Why Store Editor Output as JSON Instead of HTML?
   Decision

The editor content is stored as JSON in PostgreSQL.

Example:

{
"type": "doc",
"content": [
{
"type": "paragraph",
"content": [
{
"type": "text",
"text": "Hello World"
}
]
}
]
}
Reasons

1. Structured Data

JSON represents the document structure.

For example:

Document
└── Paragraph
└── Text Node

This allows the application to understand individual elements.

2. Easier Version Comparison

Since every edit creates a new version, comparing structured data is easier.

Example:

Before:

{
"text":"Hello"
}

After:

{
"text":"Hello World"
}

The system can identify exactly what changed.

3. Better Future Extensibility

JSON makes adding new editor features easier.

Future additions:

Images
Tables
Mentions
Comments
Embedded media

can be added without redesigning the database.

4. Avoid HTML Parsing Problems

HTML comparison can produce unnecessary differences:

Example:

<p>Hello</p>

and

<p>
Hello
</p>

are visually identical but technically different.

JSON avoids this problem.

3. Version Storage Strategy
   Decision

The CMS stores versions using the full snapshot approach.

Every edit creates a completely new record in the PostVersions table.

Example:

PostVersions table:

Version Content
v1 "Hello"
v2 "Hello World"
v3 "Hello World!!!"

Previous versions are never modified.

Why Full Snapshots?

Advantages:

1. Simple Implementation

Creating a version only requires inserting a new database row.

No complex reconstruction logic is required.

2. Reliable Restore

Restoring an old version is easy.

The system simply copies the old snapshot and creates a new version.

Example:

Version 3
|
Restore
|
Version 4 (copy of Version 1) 3. Data Safety

Old content is always preserved.

Users cannot accidentally overwrite previous history.

Alternative: Delta Storage

Another approach is storing only the changes between versions.

Example:

Version 1:

Hello

Delta:

- World

Final:

Hello World
Advantages
Requires less storage.
Useful for very large documents.
Disadvantages
Restoration is more complicated.
Requires applying multiple changes.
Debugging becomes harder.

For this CMS, full snapshots provide better reliability and simplicity.

4. Version Diff Implementation
   Decision

The CMS uses the diff-match-patch algorithm for comparing versions.

Library:

diff-match-patch
How Diff Works

The stored JSON content is first converted into readable text.

Example:

Version 1:

Frontend

Version 2:

Frontend Development

The system extracts:

Old:
Frontend

New:
Frontend Development

Then the diff algorithm generates:

Same:
Frontend

Added:
Development
Where Does Diff Computation Run?

The comparison logic runs on the backend server.

Flow:

React Frontend
|
|
Request Compare API
|
↓
Express Backend
|
↓
Fetch Two Versions
|
↓
Run Diff Algorithm
|
↓
Return Difference
|
↓
Display Result
Why Backend?
Security

Database content is not directly exposed.

Performance

Large documents are processed server-side.

Consistency

Every client receives the same comparison result.

5. Deployment Decision
The CMS application uses a separate frontend and backend deployment strategy:

Frontend: Vercel
Backend: Render
Database: PostgreSQL
Reasons for Deployment Choices

Vercel was selected for the React + Vite frontend because it provides fast static hosting, automatic GitHub deployments, HTTPS support, and global CDN distribution.

Render was selected for the Node.js + Express backend because it supports long-running server applications, environment variable management, and automatic deployments from GitHub.

This separation allows independent deployment, better scalability, and easier maintenance.

Deployment Architecture
Architecture Flow

User Browser
↓
Frontend (React + Vite on Vercel)
↓ API Requests (Axios)
Backend (Node.js + Express on Render)
↓ Sequelize ORM
PostgreSQL Database

Production URLs

Frontend:
https://cms-task-beryl.vercel.app

Backend:
https://cms-task-bsz7.onrender.com

Challenges Faced
TypeScript Build Errors on Render due to missing type definitions.
Resolved by updating package dependencies.
CORS Errors between Vercel and Render.
Resolved by configuring Express CORS middleware.
Hardcoded Localhost API URLs in production.
Resolved by updating Axios to use the deployed Render backend URL.

Final Outcome

The deployed application successfully supports user authentication, content creation, version management, version comparison, and public blog viewing through a fully deployed production environment.

6. What I Would Improve With More Time
   
1. Better Rich Text Rendering

Currently the system focuses on storing and comparing content.

Future improvement:

Better preview rendering
Image support
Tables
Advanced formatting 2. Real-time Autosave

Currently versions are created when the user saves changes.

Improvement:

Implement autosave:

User typing
|
|
Auto save draft
|
|
Create version 3. Role Based Access Control

Currently users manage their own posts.

Future:

Add roles:

Admin
|
Editor
|
Viewer

Permissions can control:

Editing
Publishing
Deleting 4. Improved Diff Viewer

Current diff:

Added text
Removed text

Future improvement:

Show:

Side-by-side comparison
Paragraph-level changes
Formatting changes
Inline highlights 5. Deployment Automation

Add:

CI/CD pipeline
Automated testing
Docker deployment
Summary

The CMS was designed around three main principles:

Data Safety
Version snapshots preserve complete history.
Maintainability
JSON-based editor storage keeps the system flexible.
Scalability
Backend-controlled versioning and comparison allow future improvements.

These decisions provide a strong foundation for a production-ready content management system.
