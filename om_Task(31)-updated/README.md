# Task 31 - Creating a Simple Web Server with Node.js

## Overview
This project uses Node.js's built-in `http` module to create a small web server and serve different HTML pages for different routes.

## Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- Any other route - Custom 404 page

## Files
- `server.js` - Creates the HTTP server and handles routing.
- `package.json` - Project metadata and start command.
- `public/index.html` - Home page.
- `public/about.html` - About page.
- `public/contact.html` - Contact page.
- `public/404.html` - Custom invalid-route page.
- `public/style.css` - Shared styling.

## How to run
1. Install Node.js.
2. Open this folder in a terminal.
3. Run `npm start`.
4. Open `http://localhost:3000` in your browser.

## Status codes
- Successful pages return HTTP `200`.
- Unknown routes return HTTP `404`.
- A file-reading failure returns HTTP `500`.

No Express or other server framework is used.
