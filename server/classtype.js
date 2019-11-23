const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from ClassType`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {classtype_name} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO ClassType (classtype_name) values ('${classtype_name}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:classtype_id', (request, response) => {
    const {classtype_id} = request.params
    const {classtype_name} = request.body
    const connection = db.connect()
    const statement = `update ClassType set classtype_name='${classtype_name}' where classtype_id = ${classtype_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:classtype_id', (request, response) => {
    const {classtype_id} = request.params
    const connection = db.connect()
    const statement = `delete from ClassType where classtype_id = ${classtype_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router