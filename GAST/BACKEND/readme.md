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

# Maps API Endpoints Documentation

## 1. Get Coordinates Endpoint

### Description
Converts an address into geographical coordinates (latitude and longitude).

### Route
```
GET /maps/get-coordinates
```

### Headers
- `Authorization`: Bearer token (JWT)

### Query Parameters
- `address` (string, required): The address to geocode (minimum 3 characters)

### Response
```json
{
    "lat": number,
    "lng": number
}
```

### Status Codes
- **200**: Successfully retrieved coordinates
- **400**: Invalid address format or missing address
- **401**: Unauthorized access
- **500**: Server error

## 2. Get Distance and Time Endpoint

### Description
Calculates the distance and duration between two locations.

### Route
```
GET /maps/get-distance-time
```

### Headers
- `Authorization`: Bearer token (JWT)

### Query Parameters
- `origin` (string, required): Starting location (minimum 3 characters)
- `destination` (string, required): Ending location (minimum 3 characters)

### Response
```json
{
    "distance": {
        "text": "string",
        "value": number
    },
    "duration": {
        "text": "string",
        "value": number
    }
}
```

### Status Codes
- **200**: Successfully retrieved distance and time
- **400**: Invalid parameters
- **401**: Unauthorized access
- **500**: Server error

## 3. Get Location Suggestions Endpoint

### Description
Provides autocomplete suggestions for location search.

### Route
```
GET /maps/get-suggestion
```

### Headers
- `Authorization`: Bearer token (JWT)

### Query Parameters
- `input` (string, required): Search text for location (minimum 3 characters)

### Response
```json
{
    "suggestions": [
        {
            "place_id": "string",
            "description": "string",
            "structured_formatting": {
                "main_text": "string",
                "secondary_text": "string"
            }
        }
    ]
}
```

### Status Codes
- **200**: Successfully retrieved suggestions
- **400**: Invalid input
- **401**: Unauthorized access
- **500**: Server error

## Implementation Notes

### Services (maps.service.js)
- Uses Google Maps Geocoding API for coordinate conversion
- Uses Google Maps Distance Matrix API for distance/time calculations
- Uses Google Maps Places Autocomplete API for location suggestions
- Requires valid Google Maps API key in environment variables

### Security
- All endpoints require JWT authentication
- Input validation implemented using express-validator
- API key protected through environment variables

### Error Handling
- Comprehensive error handling for API responses
- Validation errors returned with appropriate status codes
- Detailed error messages in development environment

### Rate Limiting
- Subject to Google Maps API usage limits
- Implement appropriate caching strategies for production use

### Environment Variables Required
```
GOOGLE_MAPS_API=your_google_maps_api_key
```

// ...existing code...

# Rides API Endpoints Documentation

## 1. Create Ride Endpoint

### Description
Creates a new ride request with pickup and destination locations.

### Route
```
POST /rides/create
```

### Headers
- `Authorization`: Bearer token (JWT)

### Request Body
```json
{
    "pickup": "123 Start Street, City",
    "destination": "456 End Avenue, City",
    "vehicleType": "car"  // Options: "car", "bike", "bicycle"
}
```

### Response
```json
{
    "_id": "rideId",
    "user": "userId",
    "pickup": "123 Start Street, City",
    "destination": "456 End Avenue, City",
    "fare": 150.50,
    "status": "Pending",
    "otp": "123456"
}
```

### Status Codes
- **201**: Ride created successfully
- **400**: Invalid input parameters
- **401**: Unauthorized access
- **500**: Server error

### 2. Get Fare Estimate Endpoint

### Description
Calculates the estimated fare for a ride based on distance and vehicle type.

### Route
```
GET /rides/get-fair
```

### Headers
- `Authorization`: Bearer token (JWT)

### Query Parameters
- `pickup` (string, required): Pickup location address (minimum 3 characters)
- `destination` (string, required): Destination location address (minimum 3 characters)

### Response
```json
{
  "car": 250.75,
  "bike": 150.25,
  "bicycle": 75.50
}
```

### Fare Calculation Formula
```javascript
fare = baseFare + (distanceInKm * perKmRate) + (timeInMinutes * perMinuteRate)

Where:
- car:     baseFare = 50, perKmRate = 10, perMinuteRate = 2
- bike:    baseFare = 30, perKmRate = 5,  perMinuteRate = 1
- bicycle: baseFare = 10, perKmRate = 2,  perMinuteRate = 0.5
```

### Status Codes
- **200**: Fare calculated successfully
- **400**: Invalid parameters
- **401**: Unauthorized access
- **500**: Server error

### Status Codes
- **200**: Fare calculated successfully
- **400**: Invalid parameters
- **401**: Unauthorized access
- **500**: Server error

## Implementation Details

### Ride Model Schema
```javascript
{
    user: ObjectId,          // Reference to User model
    captain: ObjectId,       // Reference to Captain model
    pickup: String,          // Pickup location
    destination: String,     // Destination location
    fare: Number,           // Calculated fare
    status: String,         // ["Pending", "Confirmed", "Ongoing", "Canceled", "Completed"]
    duration: Number,       // Trip duration in seconds
    distance: Number,       // Trip distance in meters
    paymentId: String,     // Payment reference
    orderId: String,       // Order reference
    signature: String,     // Payment signature
    otp: String           // 6-digit verification code
}
```

### Security Features
- JWT authentication required for all endpoints
- Input validation using express-validator
- OTP generation for ride verification
- Payment integration support

### Error Handling
- Comprehensive validation for all input parameters
- Detailed error messages for debugging
- Proper HTTP status codes for different scenarios

### Example Usage

#### Creating a New Ride
```javascript
const response = await axios.post('/rides/create', {
    pickup: "Central Park, New York",
    destination: "Times Square, New York",
    vehicleType: "car"
}, {
    headers: {
        Authorization: `Bearer ${userToken}`
    }
});
```

#### Getting Fare Estimate
```javascript
const response = await axios.get('/rides/get-fair', {
    params: {
        pickup: "Central Park, New York",
        destination: "Times Square, New York"
    },
    headers: {
        Authorization: `Bearer ${userToken}`
    }
});
```

### Notes
- All distances are calculated using Google Maps API
- Fare estimates may vary based on traffic conditions
- OTP is required for ride verification
- Real-time tracking available for ongoing rides