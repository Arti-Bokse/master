const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from FacultyType`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router