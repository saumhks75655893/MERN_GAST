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
