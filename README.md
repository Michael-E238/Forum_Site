# Welcome_to_the_Old_Internet

## Overview
The "Welcome to the Old Internet" App is a full-stack web application designed to help users create posts on a variety of topics that suit their interests, taking inspiration from old 2000s websites to generate a warm feeling of nostalgia. It features user authentication, diversification of subject matter, and secure access to protected routes. Built using Python, React, Node.JS, and JWT, this app ensures both functionality and security.

---

## Features
### 1. User Authentication
- **Sign Up**: Users can register with a username, email, and password.
- **Login**: Authenticate using email and password to receive a secure JSON Web Token (JWT).
- **Protected Routes**: Secure endpoints accessible only to authenticated users.

### 2. Forum Management
- **Retrieve Specific Threads**: Fetches a specific thread by selecting the corresponding topic.
- **Add Forum Posts**: Create new posts to add to the specific thread in which they are relevant.
- **Compartamentalizing Unique Threads**: Creating clear distinctions between multiple threads to prevent overlap from unrelated discussion topics.

### 3. Security
- **Password Encryption**: All passwords are hashed using `bcrypt`.
- **JWT-Based Authentication**: Tokens are used to secure user sessions.

---

## Tech Stack
### Backend:
- **JWT**: Secure authentication mechanism.
- **Flask**: Fullstack variant of Python, handling the server data.

### Database:
- **Relational Database**: Compatible with PostgreSQL/MySQL (configured using GraphQL).

---

## API Endpoints

### User Routes
| Method | Endpoint       | Description                 | Auth Required |
|--------|----------------|-----------------------------|---------------|
| POST   | `/register`    | User registration           | Yes           |
| GET    | `/register`    | User registration           | No            |
| POST   | `/login`       | User login                  | Yes           |
| GET    | `/login`       | User login                  | No            |
| GET    | `/protected`   | Example of a protected route| Yes           |

### Forum Routes
| Method | Endpoint       | Description                 | Auth Required |
|--------|----------------|-----------------------------|---------------|
| GET    | `/categories`  | Retrieve all categories     | No            |
| POST   | `/categories`  | Create a new category       | No            |
| GET    | `/threads`     | Retrieve all threads        | No            |
| POST   | `/threads`     | Create a new thread         | No            |
| GET    | `/posts`       | Retrieve all thread posts   | No            |
| POST   | `/posts`       | Create a new post           | No            |

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone (https://github.com/Michael-E238/Forum_Site)
   cd Forum_Site

2. Install dependencies:

    ```bash
    pip install blinker
    pip install click
    pip install colorama
    pip install Flask
    pip install Flask-JWT-Extended
    pip install SQLAlchemy
    pip install Flask-SQLAlchemy
    pip install greenlet
    pip install itsdangerous
    pip install Jinja2
    pip install MarkupSafe
    pip install PyJWT
    pip install typing_extensions
    pip install Werkzeug

3. Run the application:

    ```bash
    Copy
    Edit
    bun run dev
    Access the application at http://localhost:3000.

---

## File Structures
### Key Files
- Home.tsx: Defines the front end of the homepage.
- main.tsx: Handles routes between saving posts to threads, and navigating to the homepage.
- App.tsx: Saves forum posts as GraphQL documents, and sends them to the public server.
- models.py: Contains logic and functionality for threads and posts in set categories.
- auth.py: Contains logic for user authentication and authorization.
- auth_service.py: Contains logic for user signup, login, and protected access.
- app.py: Handles routes for switching between navbar pages, navigating across threads, and creating new posts.
- config.py: Utility for generating and verifying JWT tokens.

---

## Future Enhancements
- Create a wider variety of forum topics for people to discuss on.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
