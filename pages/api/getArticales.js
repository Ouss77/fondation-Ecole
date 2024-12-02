const pool = require('./db');

export default async function getArticles(req, res) {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Query the database
    const [rows] = await connection.query('SELECT * FROM articles_DATA');

    // Send the data as JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();
  }
}

