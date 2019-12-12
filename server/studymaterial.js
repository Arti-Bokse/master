const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer =require('multer')
const upload = multer({ dest: './StudyMaterial/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from StudyMaterial sm INNER JOIN Subject s ON sm.sub_id=s.sub_id INNER JOIN Course c ON sm.course_id=c.course_id INNER JOIN Batch b ON sm.batch_id=b.batch_id`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/',upload.single('sm_attachment'), (request, response) => {
    const {sm_title,sub_id,course_id,batch_id} = request.body

    const sm_attachment = request.file.filename

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO StudyMaterial (sm_title,sub_id,course_id,batch_id,sm_attachment) values ('${sm_title}',${sub_id},${course_id},${batch_id},'${sm_attachment}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:sm_id', (request, response) => {
    const {sm_id} = request.params
    const {sm_title,sub_id,course_id,batch_id,sm_attachment} = request.body
    const connection = db.connect()
    const statement = `update StudyMaterial set sm_title='${sm_title}',sub_id=${sub_id},course_id=${course_id},batch_id=${batch_id},sm_attachment='${sm_attachment}' where sm_id = ${sm_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:sm_id', (request, response) => {
    const {sm_id} = request.params
    const connection = db.connect()
    const statement = `delete from StudyMaterial where sm_id = ${sm_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router