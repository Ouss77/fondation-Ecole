const mysql = require("mysql2/promise");

// Create a connection pool
const pool = mysql.createPool({
  host:  "afmassnadmin.mysql.db:3306", // You might need to update this if it's incorrect
  user: "afmassnadmin", // Make sure this is correct
  password: "AF3m2022",
  database: "afmassnadmin",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to check MySQL connection
const checkConnection = async () => {
  try {
    // Test the connection to the MySQL server
    const connection = await pool.getConnection();
    console.log("Database connected successfully!");
    connection.release(); // Always release the connection back to the pool
  } catch (err) {
    console.error("Database connection failed:", err.message);
    if (err.code === 'ENOTFOUND') {
      console.error("The MySQL server hostname could not be found. Please check the host address.");
    }
    if (err.code === 'ECONNREFUSED') {
      console.error("The MySQL server refused the connection. Please check if the server is running.");
    }
  }
};

// Call the function to check the connection
checkConnection();

module.exports = pool;
