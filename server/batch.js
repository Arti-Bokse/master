const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Batch`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {batch_name,course_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Batch (batch_name,course_id) values ('${batch_name}',${course_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:batch_id', (request, response) => {
    const {batch_id} = request.params
    const {batch_name,course_id} = request.body
    const connection = db.connect()
    const statement = `update Batch set batch_name='${batch_name}', course_id=${course_id} where batch_id = ${batch_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:batch_id', (request, response) => {
    const {batch_id} = request.params
    const connection = db.connect()
    const statement = `delete from Batch where batch_id = ${batch_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router