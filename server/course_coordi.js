const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `SELECT cc.coco_id,c.course_name,b.batch_name,f.fac_name from CourseCo cc INNER JOIN Course c ON cc.course_id=c.course_id INNER JOIN Batch b ON cc.batch_id=b.batch_id INNER JOIN Faculty f ON cc.fac_id=f.fac_id`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {course_id, batch_id, fac_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO CourseCo (course_id, batch_id, fac_id) values (${course_id}, ${batch_id}, ${fac_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:coco_id', (request, response) => {
    const {coco_id} = request.params
    const {course_id, batch_id, fac_id} = request.body
    const connection = db.connect()
    const statement = `update CourseCo set course_id=${course_id}, batch_id=${batch_id}, fac_id=${fac_id} where coco_id = ${coco_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:coco_id', (request, response) => {
    const {coco_id} = request.params
    const connection = db.connect()
    const statement = `delete from CourseCo where coco_id = ${coco_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router