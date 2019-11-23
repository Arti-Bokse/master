const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Course`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {course_name} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Course (course_name) values ('${course_name}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:course_id', (request, response) => {
    const {course_id} = request.params
    const {course_name} = request.body
    const connection = db.connect()
    const statement = `update Course set course_name='${course_name}' where course_id = ${course_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:course_id', (request, response) => {
    const {course_id} = request.params
    const connection = db.connect()
    const statement = `delete from Course where course_id = ${course_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router