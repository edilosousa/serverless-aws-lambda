import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: '192.168.100.23',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'indt_project'
});

export const getAllCuponsHandler = async (event) => {
  try {
    const client = await pool.connect();
    
    const res = await client.query('SELECT * FROM dbgerenciadorcupons.status');
    
    client.release(); // Libera o cliente de volta para o pool
    
    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

// export const getAllCuponsHandler = async (event) => {
//   console.log('Event:', event);
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'Hello from Lambda!' }),
//   };
// };