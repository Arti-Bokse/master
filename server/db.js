const mysql = require('mysql')

function connect(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'ab_project',
        password: 'abproject',
        database: 'cdac_project',
        port: 3306
    })

    connection.connect()
    return connection
}

module.exports= {
    connect: connect
}