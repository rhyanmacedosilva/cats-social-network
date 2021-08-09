class DBModel {
    constructor() {
        this.mySQL = require('mysql');
        this.connection = this.mySQL.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        this.connect();
    }

    connect() {
        this.connection.connect();
    }

    endConnection() {
        this.connection.end();
    }

    select(fields, table, condition, order, callback) {
        let sql = "SELECT " + fields + " FROM " + table;
        if (condition != null) {
            sql += " WHERE " + condition;
        }
        if (order != null) {
            sql += " ORDER BY " + order;
        }
        this.connection.query(sql, callback);
    }

    insert(table, dataJSON, callback) {
        let sql = 'INSERT INTO ' + table + ' SET ?';
        this.connection.query(sql, dataJSON, callback);
    }
}

module.exports = () => { return DBModel };