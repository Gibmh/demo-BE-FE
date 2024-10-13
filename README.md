# Book Fair front-end 2025

This project is a web application for managing a book fair, built with React and Redux. This is a demo version of the project. All data is stored in Redux and is not connected to a server database.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Gibmh/demo-BE-FE.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd book-fair-2025
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   ```

4. **Start the development server:**

   ```sh
   npm start
   ```

5. **Open the application in your browser:**

   The application should now be running at [http://localhost:3000](http://localhost:3000).


# Book Fair Back-end 2025
## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)
- [Git](https://git-scm.com/)
- [XAMPP](https://www.apachefriends.org/download.html)
    Start module Apache and MySQL in XAMPP
- 

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Gibmh/demo-BE-FE.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd backend
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   npm install body-parser cors dotenv ejs express moment-timezone mysql2 sequelize
   npm install --save-dev @babel/core @babel/node @babel/preset-env nodemon sequelize-cli
   ```
4. **Create database**
   Create database in (http://localhost/phpmyadmin/index.php?route=/server/databases) Databasename: "book"

   Run database migrations
   ```sh
   npx sequelize-cli db:migrate
   ```

4. **Start the development server:**

   ```sh
   npm start
   ```

5. **Open the application in your browser:**

   The application should now be running at (http://localhost:3000).






