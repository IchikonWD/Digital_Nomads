import { pool, client } from '../config/sqldb.js'

const getAllCities = async () => {
    let connection, response
    try {
        connection = await pool.connect()
        let sql_query = 'SELECT * FROM cities'
        response = await pool.query(sql_query)
        console.log(response);
    } catch (err) {
        console.log(err.stack)
    }
    finally {
        connection.release()
    }
    return response.rows
}
const getOneCity = async (param) => {
    let connection, response
    try {
        connection = await pool.connect()
        let sql_query = 'SELECT * FROM cities WHERE id=(SELECT id FROM cities WHERE name=$1)'
        response = await pool.query(sql_query, [param])
        console.log(response);
    } catch (err) {
        console.log(err.stack)
    }
    finally {
        connection.release()
    }
    return response.rows
}

export { getAllCities, getOneCity }
