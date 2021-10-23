import { pool, client } from '../config/sqldb.js'

const getAllCities = async () => {
    let prueba, response
    try {
        prueba = await pool.connect()
        let sql_query = 'SELECT * FROM cities'
        response = await pool.query(sql_query)
        console.log(response);
    } catch (err) {
        console.log(err.stack)
    }
    finally {
        prueba.release()
    }
    return response.rows
}

export { getAllCities }