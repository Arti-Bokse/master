const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Performance`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {sub_id,per_theorymarks,per_labmarks,per_internalmarks,per_total,per_maxmarks,per_status,stud_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Performance (sub_id,per_theorymarks,per_labmarks,per_internalmarks,per_total,per_maxmarks,per_status,stud_id) 
    values (${sub_id},${per_theorymarks},${per_labmarks},${per_internalmarks},${per_total},${per_maxmarks},'${per_status}',${stud_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:per_id', (request, response) => {
    const {per_id} = request.params
    const {sub_id,per_theorymarks,per_labmarks,per_internalmarks,per_total,per_maxmarks,per_status,stud_id} = request.body
    const connection = db.connect()
    const statement = `update Performance set sub_id=${sub_id} ,per_theorymarks=${per_theorymarks},per_labmarks=${per_labmarks},per_internalmarks=${per_internalmarks},
    per_total=${per_total},per_maxmarks=${per_maxmarks},per_status='${per_status}',stud_id=${stud_id} where per_id = ${per_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:per_id', (request, response) => {
    const {per_id} = request.params
    const connection = db.connect()
    const statement = `delete from Performance where per_id = ${per_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router