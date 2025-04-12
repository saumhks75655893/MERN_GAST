# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Authentication Endpoints

### User Authentication

#### User Login
- **Path:** `/userlogin`
- **Method:** POST
- **Description:** Authenticates regular users
- **Fields:**
  - email (required)
  - password (required)

#### User Registration
- **Path:** `/usersignup` 
- **Method:** POST
- **Description:** Register new users
- **Fields:**
  - firstName (required)
  - lastName (required)
  - email (required)
  - password (required)

### Captain Authentication

#### Captain Login
- **Path:** `/captainlogin`
- **Method:** POST
- **Description:** Authenticates fleet captains
- **Fields:**
  - email (required)
  - password (required)

#### Captain Registration
- **Path:** `/captainsignup`
- **Method:** POST
- **Description:** Register new fleet captains
- **Fields:**
  - firstName (required)
  - lastName (required)
  - email (required)
  - password (required)

**Note:** All authentication endpoints return a JWT token upon successful authentication.