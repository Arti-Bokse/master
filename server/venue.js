const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Venue`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {venue_name} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Venue (venue_name) values ('${venue_name}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:venue_id', (request, response) => {
    const {venue_id} = request.params
    const {venue_name} = request.body
    const connection = db.connect()
    const statement = `update Venue set venue_name='${venue_name}' where venue_id = ${venue_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:venue_id', (request, response) => {
    const {venue_id} = request.params
    const connection = db.connect()
    const statement = `delete from Venue where venue_id = ${venue_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router