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

router.post('/', (request, response) => {
    const {factype_name} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO FacultyType (factype_name) values ('${factype_name}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:factype_id', (request, response) => {
    const {factype_id} = request.params
    const {factype_name} = request.body
    const connection = db.connect()
    const statement = `update FacultyType set factype_name='${factype_name}' where factype_id = ${factype_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:factype_id', (request, response) => {
    const {factype_id} = request.params
    const connection = db.connect()
    const statement = `delete from FacultyType where factype_id = ${factype_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router