Developed by:

ST10081301: Kyle Josh Venter<br />
ST10068305: Connor Richard Davis<br />
ST1002865:  Umar Bux<br />
ST10240068: Mohamed Ziyaa Moosa<br />

# Customer International Payments Portal

 Website: [View](https://charos.vps1.lone-wolf.dev)
 Demo Video: [View](https://youtu.be/UQeX_-OI3ZQ)

 Overview

This project is a Customer International Payments Portal, developed using Hono for the backend, with a focus on secure headers, CORS, CSRF protection, password security via bcrypt, and session-based authentication using Hono Sessions. The portal allows customers to securely make international payments while ensuring that sensitive data like passwords are never returned to the client.

# READ THIS

Install Chocolatey from [here](https://chocolatey.org/install) if you are running in Windows.

Install OpenSSL

##### Linux

```bash
sudo apt-get install libssl-dev
```

##### Windows

```bash
choco install OpenSSL
```

Follow the prompts for either of the above steps.

Install Bun from [here](https://bun.sh)

##### Run `generate-certificates` In The `backend` Project Directory

```bash
bun generate-certificates.ts
```

Follow the prompts

Run The API

```bash
cd backend/ && bun index.ts
```

Run The Frontend

```bash
cd frontend && bun run build && bunx serve dist -p 3000
```

Access The Frontend

Open your browser for https://localhost:3000

 Technologies Used

- Backend Framework: Hono.dev (Fast, lightweight web framework)
- Frontend: React (or Angular)
- Password Security: bcrypt
- Sessions: hono-sessions with Cookie Store
- Security: Secure HTTP headers, CORS, CSRF protection
- Encryption: SSL (TLS) for secure traffic transmission
- DevSecOps: CircleCI for CI/CD pipeline, SonarQube for static code analysis
- Video Recording: OBS Studio

 Features

 1. Password Security with bcrypt
- Passwords are hashed and salted using bcrypt. 
- We use `bcrypt.genSalt(2048)` to generate salts and ensure password hashing.
- Passwords are stored securely using `bcrypt.hash()`, and comparison during login is done using `bcrypt.compare()`.
  
 2. Security Headers (via Hono)
- We use secure headers provided by hono.dev to set security-related HTTP headers.
    - X-Frame-Options: Prevents Clickjacking by disallowing the app from being embedded in iframes.
    - Strict-Transport-Security: Enforces secure (HTTPS) connections to the server.
    - X-Content-Type-Options: Prevents MIME-sniffing.
    - X-XSS-Protection: Helps prevent XSS attacks.
    - Content-Security-Policy (CSP): Controls resources the client can load to prevent XSS.

 3. CORS and CSRF Protection
- CORS (Cross-Origin Resource Sharing) is enabled to control which domains can access the API securely.
- CSRF Protection is handled to ensure that unauthorized cross-site requests cannot be made to the portal.

 4. Session Management with Hono Sessions and Cookie Store
- Session-based Authentication is implemented using `hono-sessions` with cookies to store session data securely.
    - Sessions are stored in encrypted cookies, ensuring that session information remains private and secure.
    - Secret values, such as passwords, are never returned in the session or in any API response.
    - For example, passwords are only processed during login and never returned to the frontend.
- The entire frontend and backend communication is served over SSL to protect against eavesdropping.

 5. Frontend Authentication
- SSL/TLS is used to ensure that all communications between the client (browser) and the server are encrypted.
- Session-based Authentication is implemented, where the server manages user sessions via HTTP sessions.
  
 6. Protection Against Web Attacks
- The portal is protected from various attacks:
  - Clickjacking: Mitigated using the `X-Frame-Options` header.
  - SQL Injection: Input validation and sanitization are applied using RegEx.
  - Cross-Site Scripting (XSS): Mitigated using `Content-Security-Policy` and `X-XSS-Protection`.
  - Session Hijacking: Secured session management and SSL are used.
  - Man-in-the-Middle (MITM) Attacks: Prevented using SSL/TLS.
  - DDoS: Rate-limiting is implemented to protect against denial-of-service attacks.
Video Demonstration

A demonstration of the working portal can be viewed [here](https://youtu.be/UQeX_-OI3ZQ). It covers:
- Secure registration and login with password hashing.
- Secure payment process with encrypted data transmission over SSL.
