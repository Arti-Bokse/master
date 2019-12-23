const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select q.qry_id,q.qry_title,q.qry_description,q.qry_type,q.stud_id,qa.qryans_ans,qa.qryans_id from Queries q LEFT OUTER JOIN QryAns qa on q.qry_id=qa.qry_id`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {qry_title, qry_description, qry_type, stud_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Queries (qry_title, qry_description, qry_type, stud_id) values ('${qry_title}', '${qry_description}', '${qry_type}', ${stud_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:qry_id', (request, response) => {
    const {qry_id} = request.params
    const {qry_title, qry_description, qry_type, stud_id} = request.body
    const connection = db.connect()
    const statement = `update Queries set qry_title='${qry_title}',qry_description='${qry_description}',qry_type='${qry_type}',stud_id=${stud_id} where qry_id = ${qry_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:qry_id', (request, response) => {
    const {qry_id} = request.params
    const connection = db.connect()
    const statement = `delete from Queries where qry_id = ${qry_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router