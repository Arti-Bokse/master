const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Question`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {qs_description,sub_id,stud_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Question (qs_description,sub_id,stud_id) values ('${qs_description}',${sub_id},${stud_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:qs_id', (request, response) => {
    const {qs_id} = request.params
    const {qs_description,sub_id,stud_id} = request.body
    const connection = db.connect()
    const statement = `update Question set qs_description='${qs_description}', sub_id=${sub_id}, stud_id=${stud_id} where qs_id = ${qs_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:qs_id', (request, response) => {
    const {qs_id} = request.params
    const connection = db.connect()
    const statement = `delete from Question where qs_id = ${qs_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router