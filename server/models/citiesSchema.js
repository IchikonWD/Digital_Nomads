import { pool, client } from '../config/sqldb.js';

// @desc    Get All Cities
// @route   Get /api/data/
// @access  Public

const getAllCities = async () => {
  let connection, response;
  try {
    connection = await pool.connect();
    let sql_query = 'SELECT * FROM cities';
    response = await pool.query(sql_query);
  } catch (err) {
    console.log(err.stack);
  } finally {
    connection.release();
  }
  return response.rows;
};

// @desc    Get One City
// @route   Get /api/data/:city
// @access  Public

const getOneCity = async (param) => {
  // Camelcase param if has two words or more
  if (param.includes('_')) {
    param = param.replace(/_/g, ' ');
    param = param.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    param = param.charAt(0).toUpperCase() + param.substr(1).toLowerCase();
  }
  let connection, response;
  try {
    connection = await pool.connect();
    let sql_query =
      'SELECT * FROM cities WHERE id=(SELECT id FROM cities WHERE name=$1)';
    response = await pool.query(sql_query, [param]);
    console.log(response);
  } catch (err) {
    console.log(err.stack);
  } finally {
    connection.release();
  }
  return response.rows;
};

export { getAllCities, getOneCity };
