const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from QsAns`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {qs_id,opt_id,qsans_qsansdesc} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO QsAns (qs_id,opt_id,qsans_qsansdesc) values (${qs_id},${opt_id},'${qsans_qsansdesc}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:qsans_id', (request, response) => {
    const {qsans_id} = request.params
    const {qs_id,opt_id,qsans_qsansdesc} = request.body
    const connection = db.connect()
    const statement = `update QsAns set qs_id=${qs_id},opt_id=${opt_id},qsans_qsansdesc='${qsans_qsansdesc}' where qsans_id = ${qsans_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:qsans_id', (request, response) => {
    const {qsans_id} = request.params
    const connection = db.connect()
    const statement = `delete from QsAns where qsans_id = ${qsans_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router