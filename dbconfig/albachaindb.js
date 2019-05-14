var mysql = require('mysql');
var config = require('./db_info').real;

module.exports= function() {
  return {
    init: function () {
      return mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        timeout: config.timeout
      })
    },
    start_db: function (con) {
      con.connect(function (err) {
        if(err) {
          console.error('Database connection error : ' + err);
        } else{
          console.info('Database is connected successfully.');
        }

      })

    }
  }

};
