const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from QryAns`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {qryans_ans, qry_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO QryAns (qryans_ans, qry_id) values ('${qryans_ans}', ${qry_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:qryans_id', (request, response) => {
    const {qryans_id} = request.params
    const {qryans_ans} = request.body
    const connection = db.connect()
    const statement = `update QryAns set qryans_ans='${qryans_ans}' where qryans_id = ${qryans_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:qryans_id', (request, response) => {
    const {qryans_id} = request.params
    const connection = db.connect()
    const statement = `delete from QryAns where qryans_id = ${qryans_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router