var sql = require('mssql');
var config = {
    user: 'sa',
    password: '123',
    server: 'localhost', 
    database: 'QL_TuyenDung',
    options: {
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

export {sql, config};