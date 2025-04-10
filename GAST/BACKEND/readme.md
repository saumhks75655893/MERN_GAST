# /users/register Endpoint Documentation

## Description

This endpoint allows new users to register on the platform. It requires specific user details, which are listed in the "Request Body" section below, to create a new account.

## Request Body

The request body should be in JSON format and contain the following fields:

-   `username`: (String, Required) The desired username for the new account.
-   `email`: (String, Required) The user's email address. Must be a valid email format.
-   `password`: (String, Required) The user's password. Should meet the minimum password requirements (e.g., minimum length).
-   `confirmPassword`: (String, Required) The user's password confirmation. Must match the password field.
-   `firstName`: (String, Optional) The user's first name.
-   `lastName`: (String, Optional) The user's last name.

Example:

```json
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "securePassword",
    "confirmPassword": "securePassword",
    "firstName": "John",
    "lastName": "Doe"
}
```

## Response Codes

- `user` (object):
  - `fullname` (object): 
    - `firstname` (string): User's first name (minimum 3 characters)
    - `lastname` (string): User's last name (minimum 3 characters)
  - `email` (string): User's email address (must be a valid email)
  - `password` (string): User's password (minimum 6 characters).
- `token` (string): JWT Token
 -----------------------------
-   **201 Created**: Successfully created a new user account.
    ```json
    {
        "message": "User registered successfully",
        "userId": "uniqueUserId"
    }
    ```
-   **400 Bad Request**: The server could not understand the request due to invalid syntax or missing required fields. Check the response body for specific error messages.
    ```json
    {
        "errors": [
            {
                "msg": "Username is required",
                "param": "username",
                "location": "body"
            }
        ]
    }
    ```
-   **409 Conflict**: The username or email is already taken.
    ```json
    {
        "message": "Username or email already exists"
    }
    ```
-   **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

## Notes

-   Ensure that the password meets the application's security requirements.
-   Handle validation errors gracefully in the client application.

## /users/login Endpoint Documentation

### Description

This endpoint allows registered users to log in to the platform. It verifies the user's credentials and returns a JWT token for authentication.

### Request Body

The request body should be in JSON format and contain the following fields:

-   `email`: (String, Required) The user's email address.
-   `password`: (String, Required) The user's password.

Example:

```json
{
    "email": "user@example.com",
    "password": "userPassword"
}
```

### Response Codes

- **user** (object):
  - **fullname** (object): 
    - **firstname** (string): User's first name (minimum 3 characters)
    - **lastname** (string): User's last name (minimum 3 characters)
  - **email** (string): User's email address (must be a valid email)
  - **password** (string): User's password (minimum 6 characters).
- **token** (string): JWT Token
----------------------------------

-   **200 OK**: Successfully logged in. Returns a JWT token and user information.

    ```json
    {
        "token": "jwtToken",
        "user": {
            "_id": "userId",
            "username": "username",
            "email": "user@example.com"
        }
    }
    ```

-   **400 Bad Request**: The server could not understand the request due to invalid syntax or missing required fields.

    ```json
    {
        "errors": [
            {
                "msg": "Email is required",
                "param": "email",
                "location": "body"
            }
        ]
    }
    ```

-   **401 Unauthorized**: Invalid email or password.

    ```json
    {
        "message": "Invalid email or password"
    }
    ```

-   **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

### Notes

-   The JWT token should be stored securely on the client-side (e.g., in local storage or a cookie).
-   The client should include the JWT token in the `Authorization` header of subsequent requests to protected endpoints.

---

# /users/profile Endpoint Documentation

## Description

This endpoint allows authenticated users to retrieve their profile information.

## Request

- **Method**: GET
- **Headers**: 
  - `Authorization`: Bearer token (JWT)

## Response Codes

- **200 OK**: Successfully retrieved user profile information.

    ```json
    {
        "user": {
            "_id": "userId",
            "username": "username",
            "email": "user@example.com",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            }
        }
    }
    ```

- **401 Unauthorized**: Missing or invalid JWT token.

    ```json
    {
        "message": "Unauthorized access"
    }
    ```

- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

---

# /users/logout Endpoint Documentation

## Description

This endpoint allows authenticated users to log out by invalidating their session.

## Request

- **Method**: GET
- **Headers**: 
  - `Authorization`: Bearer token (JWT)

## Response Codes

- **200 OK**: Successfully logged out.

    ```json
    {
        "message": "User logged out successfully"
    }
    ```

- **401 Unauthorized**: Missing or invalid JWT token.

    ```json
    {
        "message": "Unauthorized access"
    }
    ```

- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

---

# /captains/register Endpoint Documentation

## Description

This endpoint allows new captains to register on the platform. It requires specific captain and vehicle details, which are listed in the "Request Body" section below, to create a new account.

## Request Body

The request body should be in JSON format and contain the following fields:

- `fullname` (object, Required):
  - `firstname` (String, Required): The captain's first name (minimum 3 characters).
  - `lastname` (String, Optional): The captain's last name (minimum 3 characters).
- `email` (String, Required): The captain's email address. Must be a valid email format.
- `password` (String, Required): The captain's password. Should meet the minimum password requirements (e.g., minimum 6 characters).
- `vehicle` (object, Required):
  - `color` (String, Required): The vehicle's color (minimum 3 characters).
  - `plate` (String, Required): The vehicle's plate number (minimum 3 characters, must be unique).
  - `capacity` (Number, Required): The vehicle's capacity (minimum 1).
  - `vehicleType` (String, Required): The type of vehicle. Must be one of `car`, `bike`, or `bicycle`.

Example:

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "captain@example.com",
    "password": "securePassword",
    "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

## Response Codes

- **201 Created**: Successfully created a new captain account.
    ```json
    {
        "token": "jwtToken",
        "captain": {
            "_id": "captainId",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "captain@example.com",
            "vehicle": {
                "color": "Red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```

- **400 Bad Request**: The server could not understand the request due to invalid syntax or missing required fields.
    ```json
    {
        "errors": [
            {
                "msg": "First name must be at least 3 characters long",
                "param": "fullname.firstname",
                "location": "body"
            }
        ]
    }
    ```

- **409 Conflict**: The email or vehicle plate is already taken.
    ```json
    {
        "message": "Captain already exists!"
    }
    ```

- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

## Notes

- Ensure that the password meets the application's security requirements.
- Handle validation errors gracefully in the client application.
- The JWT token should be stored securely on the client-side (e.g., in local storage or a cookie).

---

# /captains/login Endpoint Documentation

## Description

This endpoint allows registered captains to log in to the platform. It verifies the captain's credentials and returns a JWT token for authentication.

## Request Body

The request body should be in JSON format and contain the following fields:

- `email`: (String, Required) The captain's email address.
- `password`: (String, Required) The captain's password.

Example:

```json
{
    "email": "captain@example.com",
    "password": "securePassword"
}
```

## Response Codes

- **200 OK**: Successfully logged in.
    ```json
    {
        "token": "jwtToken",
        "captain": {
            "_id": "captainId",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "captain@example.com",
            "vehicle": {
                "color": "Red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            }
        }
    }
    ```

- **400 Bad Request**: Invalid credentials or validation errors.
    ```json
    {
        "message": "Invalid credentials!"
    }
    ```

- **500 Internal Server Error**: The server encountered an unexpected condition.

---

# /captains/profile Endpoint Documentation

## Description

This endpoint allows authenticated captains to retrieve their profile information.

## Request

- **Method**: GET
- **Headers**: 
  - `Authorization`: Bearer token (JWT)

## Response Codes

- **200 OK**: Successfully retrieved captain profile.
    ```json
    {
        "captain": {
            "_id": "captainId",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "email": "captain@example.com",
            "vehicle": {
                "color": "Red",
                "plate": "ABC123",
                "capacity": 4,
                "vehicleType": "car"
            },
            "status": "inactive",
            "location": {
                "lat": 0,
                "lng": 0
            }
        }
    }
    ```

- **401 Unauthorized**: Missing or invalid JWT token.
    ```json
    {
        "message": "Unauthorized access"
    }
    ```

---

# /captains/logout Endpoint Documentation

## Description

This endpoint allows authenticated captains to log out by invalidating their session token.

## Request

- **Method**: GET
- **Headers**: 
  - `Authorization`: Bearer token (JWT)

## Response Codes

- **200 OK**: Successfully logged out.
    ```json
    {
        "message": "Successfully logged out"
    }
    ```

- **401 Unauthorized**: Missing or invalid JWT token.
    ```json
    {
        "message": "Unauthorized access"
    }
    ```

## Notes

- The JWT token must be included in the Authorization header as a Bearer token
- Token will be blacklisted upon logout
- All subsequent requests with the blacklisted token will be rejected

