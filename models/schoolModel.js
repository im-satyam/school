const db = require('../config/db');
const School = {
    add: async (name, address, latitude, longitude) => {
        const [result] = await db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        return result;
    },

    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM schools');
        return rows;
    }
};
module.exports = School;
