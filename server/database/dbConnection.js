class dbConnection {
    constructor() {
        this.connection = null;
    }

    async connect() {
        const oracledb = require('oracledb');

        try {
            this.connection = await oracledb.getConnection({
                user: 'ora_kyu16',
                password: 'a70917505',
                connectString: 'jdbc:oracle:thin:@dbhost.students.cs.ubc.ca:1522:stu'
            });
            console.log('Connected to database');
        } catch (err) {
            console.error('Error connecting to database:', err);
            throw err;
        }
    }

    async disconnect() {
        if (this.connection) {
            try {
                await this.connection.close();
                console.log('Disconnected from database');
            } catch (err) {
                console.error('Error disconnecting from database:', err);
                throw err;
            }
        }
    }

    async executeQuery(sql, bindings) {
        if (!this.connection) {
            throw new Error('Database connection has not set');
        }

        try {
            return await this.connection.execute(sql, bindings);
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
}