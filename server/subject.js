const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Subject`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {sub_name} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Subject (sub_name) values ('${sub_name}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:sub_id', (request, response) => {
    const {sub_id} = request.params
    const {sub_name} = request.body
    const connection = db.connect()
    const statement = `update Subject set sub_name='${sub_name}' where sub_id = ${sub_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:sub_id', (request, response) => {
    const {sub_id} = request.params
    const connection = db.connect()
    const statement = `delete from Subject where sub_id = ${sub_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router