Hi! for start to using Simple-CRUD-API you need: 

**Steps:**
1. Clone the repository:
   `git clone https://github.com/FavelLooking/Simple-CRUD-API`
2. Go to specified folder:   
   `cd Simple-CRUD-API`

3. Install dependencies:
`npm install`

5. Create a .env file (if applicable) and add the necessary environment variables:
`PORT=3000`

6. Start the application:
in development mode you need to run  `npm run start:dev` script
in production mode you need to run  `npm run start:prod` script

7.Open your browser and go to `http://localhost:{PORT}`.

**API Endpoints:**

- Get a list of all users.
GET `/api/users/`

- Get a list of specified user.
GET `api/users/{userId}`

- Creates a new user.
POST `/api/users`

- Updates a user by ID.
PUT `/api/users/{userId}`

- Deletes a user by ID.
DELETE `/api/users/{userId}`

Testing
Sorry, tests weren't implemented
