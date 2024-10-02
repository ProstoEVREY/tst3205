### Test App for 3205team

This project consists of two main components:
1. **React Frontend**: A simple form-based application that allows users to submit their email and phone number, sends the data to the server, and displays the results in a styled list.
2. **Node.js Backend**: An Express server that handles the form submission, processes the data, and responds with mock user information after a simulated delay.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-url/fullstack-app.git
cd fullstack-app
```

### 2. Configuring the Environment

You need to make sure that the client knows the backend to knock to: for this in the client dir we need to create .env file:

    ```bash
    cd server
    touch .env
    ```

    Open the file and insert this

    #### REACT_APP_BACKEND_URL=http://localhost:8000

    where 8000 is the port by default

### 3. Setting Up the server

1. Navigate to the `server` directory (if not already there):

    ```bash
    cd server
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm run start
    ```

   By default, the backend server will run on `http://localhost:8000 unless you specify another port in .env like this PORT=...`.


### 4. Setting Up the client

1. Navigate to the `client` directory in a separate terminal window:

    ```bash
    cd client
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run start
    ```

   By default, the frontend server will run on `http://localhost:3000`.

### 5. Access the Application

1. Once both servers are running, open your browser and go to:

   ```
   http://localhost:3000
   ```

2. Fill out the form with a valid email and optional phone number, then click the `Submit` button.

3. The frontend will send the data to the backend, wait for 5 seconds (simulated delay), and display the list of people in a formatted list.

## Project Details

### Backend

The backend is a simple Express.js server written in TypeScript that includes:

- **API Endpoint**: `POST /api/search`
  - Accepts JSON data in the following format:

    ```json
    {
      "email": "test@example.com",
      "number": "22-33-44"
    }
    ```

  - Responds with a simulated list of people after a 5-second delay.

- **Request Cancellation**: The server can handle request cancellations using `AbortController` if the frontend sends a new request before the previous one completes.

### Frontend

The frontend is a React app built with TypeScript that includes:

- **Form with Validation**: Utilizes `zod` for email and phone number validation.
- **Axios Request Handling**: Submits the form data to the backend and handles cancellations using `AbortController`.
- **Styled List Output**: Displays the results returned from the backend in a visually appealing format.
- **Toast Notifications**: Uses `react-toastify` to show success or error messages based on form submission status.

## How to Customize

1. **Changing the Backend Port**:
   - Modify the port in `backend/index.ts` if needed.
   - Update the frontend API URL accordingly.


## Troubleshooting

- **Port Conflicts**:
  - Make sure no other applications are running on ports `3000` (frontend) and `5000` (backend).

