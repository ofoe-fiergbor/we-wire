# Forex

Welcome to the Project Name! This project is built with NestJS and React (NextJs), and here are the instructions to get it up and running.

## Setup Instructions

### Database Setup

1. Make sure you have Docker installed on your machine.

2. Open a terminal and run the following command to start a PostgreSQL database container:

   ```bash
   docker run -d \
     --name your_database_container_name \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=randompassword \
     -e POSTGRES_DB=wewire-rdb \
     -p 5432:5432 \
     postgres:latest


3. Set the user's password:

    ```bash
    ALTER USER postgres PASSWORD 'randompassword';
    ```

4. Your database URL should now look like this:

    ```plaintext
    postgresql://postgres:randompassword@localhost:5432/wewire-rdb
    ```

5. Open the `prisma/.env` file and set the `DATABASE_URL` variable to the database URL from step 4.

6. Run Prisma migrations:

    ```bash
    npx prisma migrate dev
    ```

## Run Backend

1. Make sure you have Node.js installed on your machine.

2. Navigate to the `backend` directory:

    ```bash
    cd apps/api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the backend server:

    ```bash
    npm run start:dev
    ```

5. The backend will run on [http://localhost:8080](http://localhost:8080).

## Run Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd apps/ui
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

4. The frontend will run on [http://localhost:3000](http://localhost:3000).

Now you should have the Project Name running locally with the provided database URL and the backend on port 8080 and frontend on port 3000

```angular2html
PS: Due to unforeseen time constraints, some aspects of the project may be pending completion. 
Your understanding is greatly appreciated, and I am committed to finalizing the outstanding tasks 
i am later required to. Thank you for your patience.
```
