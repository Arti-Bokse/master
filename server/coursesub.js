const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from CourseSub`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {sub_id,course_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO CourseSub (sub_id,course_id) values (${sub_id},${course_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:cosub_id', (request, response) => {
    const {cosub_id} = request.params
    const {sub_id,course_id} = request.body
    const connection = db.connect()
    const statement = `update CourseSub set sub_id=${sub_id},course_id=${course_id} where cosub_id = ${cosub_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:cosub_id', (request, response) => {
    const {cosub_id} = request.params
    const connection = db.connect()
    const statement = `delete from CourseSub where cosub_id = ${cosub_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router