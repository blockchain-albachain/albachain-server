
module.exports = (function () {
    return {
      local: { // localhost
        host: 'localhost',
        port: '3306',
        user: 'alba',
        password: '12341234',
        database: 'albachain',
        multipleStatements: true
      },
      real: { // real server db info
        host: 'albachain.cvrulfsmzgae.us-east-2.rds.amazonaws.com',
        port: '3306',
        user: 'alba',
        password: '1q2w3e4r',
        database: 'albachain',
        timeout : 60000
      }
    }
  })();
