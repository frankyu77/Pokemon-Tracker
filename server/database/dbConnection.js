
const oracledb = require('oracledb');


class dbConnection {
     constructor() {
        this.oracledb = oracledb;
        this.oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        this.connection = null;
    }

    async connect() {
         console.log("connection");
        try {
            console.log("try");
            this.connection = await this.oracledb.getConnection({
                user: "ora_kyu16",
                password: "a70917505",
                connectString: "dbhost.students.cs.ubc.ca:1522/stu"
            });
            console.log("Connected to database");
            return this.connection;
        } catch (error) {
            console.error("Error connecting to Oracle DB:", error);
            throw error;
        }
    }

    async executeQuery(sql, bindings = []) {
        if (!this.connection) {
            throw new Error('Database connection has not set');
        }
        try {
            // return await this.connection.execute(sql, bindings);
            return await this.connection.execute(sql, bindings, { autoCommit: true });
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

}
module.exports = dbConnection;

// const lol = require('./dbConnection');
//
// // Create an instance of the dbConnection class
// const connection = new lol();
//
// // Call the connect method to establish a database connection
// connection.connect()
//     .then(() => {
//         console.log('Database connection established successfully!');
//         // You can perform additional operations after the connection is established
//     })
//     .catch(error => {
//         console.error('Error connecting to the database:', error);
//     });
