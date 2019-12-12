const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer =require('multer')
const upload = multer({ dest: './InstructionDoc/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Instruction i LEFT OUTER JOIN Course c ON i.course_id=c.course_id LEFT OUTER JOIN Batch b ON i.batch_id=b.batch_id`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/',upload.single('int_attachment'), (request, response) => {
    const {ins_title,ins_description,course_id,batch_id,ins_type} = request.body

    const int_attachment = request.file.filename

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Instruction (ins_title,ins_description,int_attachment,course_id,batch_id,ins_type) 
    values ('${ins_title}','${ins_description}','${int_attachment}',${course_id},${batch_id},'${ins_type}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.post('/allins',upload.single('int_attachment'), (request, response) => {
    const {ins_title,ins_description,ins_type} = request.body

    const int_attachment = request.file.filename

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Instruction (ins_title,ins_description,int_attachment,ins_type) 
    values ('${ins_title}','${ins_description}','${int_attachment}','${ins_type}')`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:ins_id', (request, response) => {
    const {ins_id} = request.params
    const {ins_title,ins_description,int_attachment,course_id,batch_id,ins_type} = request.body
    const connection = db.connect()
    const statement = `update Instruction set ins_title='${ins_title}',ins_description='${ins_description}',int_attachment='${int_attachment}',course_id='${course_id}',batch_id='${batch_id}',
    ins_type='${ins_type}' where ins_id = ${ins_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:ins_id', (request, response) => {
    const {ins_id} = request.params
    const connection = db.connect()
    const statement = `delete from Instruction where ins_id = ${ins_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router