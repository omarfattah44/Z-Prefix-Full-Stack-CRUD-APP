# Z-Prefix-Full-Stack-CRUD-APP

# Inventory App

## Overview

This Inventory App is a full-stack CRUD application designed for inventory managers. The application lets users create an account, log in, and manage inventory items. It meets the following requirements:

- **User Authentication:**  
  Users can register and log in. Upon successful registration or login, a JSON Web Token (JWT) is issued and stored via an AuthContext, which secures subsequent API calls.

- **Inventory Management:**  
  Authenticated users can create, view, update, and delete inventory items. The inventory list shows truncated item descriptions (first 100 characters with "..." appended if longer). Unauthenticated users can view items but cannot modify them.

- **API Security:**  
  Protected endpoints are secured using JWT-based authentication. The front end passes the JWT token with API requests that require authorization.

- **Technology Stack:**  
  - **Front End:** Vite/React with simple, custom CSS.  
  - **Back End:** Node.js with Express.  
  - **Database:** PostgreSQL, managed with Knex (including migrations and seeds).

- **Best Practices:**  
   - Guidance on methodologies and practices to fulfill the user story requirements was either gathered from past projects and or mentorship on the potentiality of how a generic file structure could look like by ChatGPT. 
   
   -This guidance, helped me formulate a plan to tackle my coding, I sometimes asked for psuedo code to help guide my logic especially for things like authentication.

   - This is a good practice to keep in mind before diving deep into coding. Having a general idea of what your file structure should look like, then making tweaks along the way to fulfill user requirements is another good practice. 

   - Using Prettier for consistent code formatting can help with the readability of your cod eand aid in organizing it into clear directories. 
   
   - Additionally, using Copilot, youtube, and google searches can assist with troubleshooting, which is what I did for issues I ran into.

## How to Run on Another Device

- **Follow these detailed instructions to set up and run the application on another machine.**

### Prerequisites

-**Make sure the target device has:**
- **Node.js** – [Download Node.js](https://nodejs.org/)
- **npm** – Comes with Node.js
- **PostgreSQL** – [Download PostgreSQL](https://www.postgresql.org/)

- note: I created this on a windows computer

### Back End Setup

1. **Clone the Repository:**


   git clone <repository-url>
   cd Inventory-App/backend-server

2. **Install Dependencies in terminal:**

cd backend-server
npm install

3. **Configure Environment Variables:**

Create a .env file in the backend-server directory with content similar to:

env
Copy
PORT=5000
DB_HOST=localhost
DB_PORT=5433   # Use your PostgreSQL port (common mistake: using the wrong port)
DB_USER=postgres
DB_PASSWORD=   # Leave empty if using "trust" authentication; otherwise, ensure this matches your DB setup
DB_NAME=inventorydb
JWT_SECRET=your_jwt_secret
NODE_ENV=development

**Common Pitfalls:**

-Not creating a .env file or misnaming it.

-Incorrect DB_PORT or DB_USER credentials.

-Forgetting to set JWT_SECRET, which will break JWT signing/verification.

3. **Run Migrations and Seeds:**

Execute the following commands to set up the database schema and seed initial data:


npx knex migrate:latest
npx knex seed:run

**Common Mistakes:**

Not running migrations/seeds or running them in the wrong order.

Database connection errors due to incorrect environment variable configuration.

4. **Start the Back End Server:**

npm run dev
The server should start on the specified port (e.g., http://localhost:5000).

### Front End Setup

1. Navigate to the Front End Directory and install dependencies:


cd ../frontend-client

**Install Dependencies:**


npm install

**This will install the following:**

-React and ReactDOM

-react-router-dom for routing

-axios for making API calls

-Vite for development tooling

**Common Mistakes:**

Not installing all dependencies, especially missing React or react-router-dom, which can lead to module not found errors.

2. **Run the Front End Server:**


npm run dev

Vite will start the development server (usually at http://localhost:3000).

3. **Open Your Browser:**

Navigate to http://localhost:3000 to see the Inventory App in action. You can now navigate between Inventory, Login, Register, and Add Item pages.

### User Flow & Features

**Registration and Login:**

- New users can register on the Register page. Upon successful registration, the user is automatically logged in and receives a JWT token stored in localStorage via the AuthContext.

- Existing users can log in via the Login page.

**Inventory Management:**

- Once logged in, users can view the inventory list, add new items using the ItemForm, and update or delete existing items.

- Unauthenticated users can view the inventory list but cannot perform any modifications.

**API Security:**

- The back end secures protected endpoints with JWT-based authentication, and the front end sends the token with API requests as needed.

### Challenges and Lessons Learned

**Database Connectivity:**

- I encountered issues with PostgreSQL authentication and port configurations, which were resolved by adjusting the .env file and ensuring the correct settings in pg_hba.conf.

**File Structure and Imports:**

- Initially, I used inline components in App.jsx for live progress and to play around with the components. After verifying functionality, I refactored the code into separate files for better modularity and maintainability. I noticed the more organized and modular my code was it tended to stay functional because I was able to follow almost like a blueprint.

**JWT Token Handling**
-Managing JWT tokens presented its own challenges, not having much experience with it opened a large learning curve in the process. 

-Particularly in ensuring the token was properly generated and passed with protected API requests. 

-Debugging token verification issues helped me understand the importance of secure token management and proper environment variable configuration.

**Learning bcrypt:**

- Learning to use bcrypt for password hashing was challenging. I had to understand the importance of salt rounds and how hashing works to securely store passwords. Overcoming these challenges was a significant learning experience in securing user data.

- Once I felt I understood it, it proved very useful for security.

**Tooling and Guidance:**

- Referencing past projects using ChatGPT to provide mentorship on best practices and potential project structure,served to be very useful. This is because it made useful recommendations to fulfill user requirements (i.e the JWT token for authentication) while still allowing me to do the code.

-Copilot, youtube, and google searches assisted with troubleshooting specific issues.

- Using Psuedo code, can be a good way to actualize your code especially for issues you might run into, then you can use your own logic to continue developing it.

- Code Formatting:
Prettier and Co-pilot was used to maintain consistent formatting throughout the project, ensuring the code looks clean and organized.
