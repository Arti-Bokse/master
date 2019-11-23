const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Options`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {opt_desc,qs_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Options (opt_desc,qs_id) values ('${opt_desc}',${qs_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:opt_id', (request, response) => {
    const {opt_id} = request.params
    const {opt_desc,qs_id} = request.body
    const connection = db.connect()
    const statement = `update Options set opt_desc='${opt_desc}',qs_id=${qs_id} where opt_id = ${opt_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:opt_id', (request, response) => {
    const {opt_id} = request.params
    const connection = db.connect()
    const statement = `delete from Options where opt_id = ${opt_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router