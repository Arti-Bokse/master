const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from StudRank`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {per_id,stud_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO StudRank (per_id,stud_id) values (${per_id},${stud_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:rank_id', (request, response) => {
    const {rank_id} = request.params
    const {per_id,stud_id} = request.body
    const connection = db.connect()
    const statement = `update StudRank set per_id=${per_id},stud_id=${stud_id} where rank_id = ${rank_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:rank_id', (request, response) => {
    const {rank_id} = request.params
    const connection = db.connect()
    const statement = `delete from StudRank where rank_id = ${rank_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router