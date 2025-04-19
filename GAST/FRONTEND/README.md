# GAST - GOODS AND SERVICE TRANSPORTATION   

## Overview
GAST is a ride-sharing platform that connects users with fleet captains. This application uses React with Vite for the frontend and includes authentication for both users and captains.

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Web browser (Chrome recommended)

### Getting Started
1. Clone the repository
2. Run `npm install` to install dependencies
3. Start the development server with `npm run dev`

## Authentication System

### For Users 🚗

#### 1. User Registration (`/usersignup`)
Create a new user account:
```json
POST /usersignup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- All fields are required
- Password must be at least 8 characters
- Email must be valid format

#### 2. User Login (`/userlogin`)
Login with existing account:
```json
POST /userlogin
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- Returns JWT token for authentication
- Token must be included in subsequent requests

### For Captains 🚘

#### 1. Captain Registration (`/captainsignup`)
Register as a fleet captain:
```json
POST /captainsignup
{
  "firstName": "Captain",
  "lastName": "Smith",
  "email": "captain@example.com",
  "password": "securepassword123"
}
```
- Requires valid email and strong password
- Additional verification may be required
- Profile completion needed after registration

#### 2. Captain Login (`/captainlogin`)
Captain authentication:
```json
POST /captainlogin
{
  "email": "captain@example.com",
  "password": "securepassword123"
}
```
- Provides access to captain-specific features
- Returns JWT token for session management

## Security Notes 🔒
- All passwords are securely hashed
- JWT tokens expire after 24 hours
- HTTPS encryption used for all requests
- Rate limiting applied to prevent abuse

## Common Issues & Solutions
1. **Login Fails**: 
   - Check email/password spelling
   - Ensure account is verified
   - Clear browser cache if needed

2. **Registration Issues**:
   - Email must be unique
   - Password requirements must be met
   - All fields are mandatory

## Need Help? 
- Check our [FAQ section](#)
- Contact support: support@gast.com
- Join our Discord community

**Note:** Remember to never share your JWT tokens or passwords. The system will never ask for your password via email.


### User Endpoints

#### 1. User Registration
```http
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```
**Response (201):**
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  },
  "token": "JWT_TOKEN"
}
```

#### 2. User Login
```http
POST /userlogin
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```
**Response (200):**
```json
{
  "user": {
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    }
  },
  "token": "JWT_TOKEN"
}
```

#### 3. User Logout
```http
GET /user/userlogout
Authorization: Bearer JWT_TOKEN
```
**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### Captain Endpoints

#### 1. Captain Registration
```http
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```
**Response (201):**
```json
{
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  },
  "token": "JWT_TOKEN"
}
```

#### 2. Captain Login
```http
POST /captainlogin
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```
**Response (200):**
```json
{
  "captain": {
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    }
  },
  "token": "JWT_TOKEN"
}
```

#### 3. Captain Logout
```http
GET /captain/captainlogout
Authorization: Bearer JWT_TOKEN
```
**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

### Protection Wrappers

#### UserProtectWrapper
- **Purpose**: Protects user-specific routes
- **Behavior**: 
  - Checks for valid user JWT token in localStorage
  - Redirects to /userlogin if no valid token found
  - Allows access to protected routes only with valid token

#### CaptainProtectWrapper
- **Purpose**: Protects captain-specific routes
- **Behavior**: 
  - Checks for valid captain JWT token in localStorage
  - Redirects to /captainlogin if no valid token found
  - Allows access to protected routes only with valid token

### Error Responses
```json
{
  "error": "Error message description",
  "status": 400/401/403/404/500
}
```

### Authentication Headers
For protected routes, include the JWT token in the Authorization header:
```http
Authorization: Bearer <JWT_TOKEN>
```