# Bloglist Redux

Bloglist Redux is a full-stack application for managing a list of blogs. It includes a backend built with Node.js and Express, and a frontend built with React and Redux. The application allows users to create, view, like, and delete blogs. It also supports user authentication and authorization.

## Features

- User authentication and authorization
- Create, view, like, and delete blogs
- Add comments to blogs
- View users and their created blogs
- Responsive design using Bootstrap
- End-to-End testing with Playwright

## Technologies Used

- **Backend**:

  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT) for authentication
  - bcrypt for password hashing

- **Frontend**:

  - React
  - Redux
  - React Router
  - Axios for HTTP requests
  - Bootstrap for styling

- **Testing**:
  - Jest and React Testing Library for unit and integration tests
  - Playwright for end-to-end tests

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/santerilukka/fullstack_part7.git
   cd full-stack-open-part7/bloglist-redux
   ```

2. Install dependencies for both backend and frontend:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the MongoDB server.

2. Set up environment variables for the backend. Create a `.env` file in the `backend` directory with the following content:

   ```env
   MONGODB_URI=<your-mongodb-uri>
   SECRET=<your-secret-key>
   ```

3. Start the backend server:

   ```sh
   cd backend
   npm run start
   ```

4. Start the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.
6. Backend JSON data can be found at `http://localhost:3000/api/blogs` for blogs and `http://localhost:3000/api/users` for users

### Running Tests

#### Backend Tests

1. Run the backend tests:
   ```sh
   cd backend
   npm test
   ```

#### Frontend Tests

1. Run the frontend tests:
   ```sh
   cd frontend
   npm test
   ```

#### End-to-End Tests

1. Start the backend and frontend servers.

2. Run the end-to-end tests:
   ```sh
   cd e2e-tests-playwright
   npm test
   ```

## Project Structure

- **Backend**: Located in the `backend` directory.

  - `controllers`: Contains the route handlers.
  - `models`: Contains the Mongoose models.
  - `utils`: Contains utility functions and middleware.
  - `tests`: Contains the backend tests.

- **Frontend**: Located in the `frontend` directory.

  - `src/components`: Contains the React components.
  - `src/reducers`: Contains the Redux reducers.
  - `src/services`: Contains the service modules for making HTTP requests.
  - `src/store.js`: Configures the Redux store.
  - `src/App.jsx`: The main application component.
  - `tests`: Contains the frontend tests.

- **End-to-End Tests**: Located in the `e2e-tests-playwright` directory.
  - `tests`: Contains the Playwright tests.
  - `playwright.config.js`: Configuration file for Playwright.
