const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')
const multer =require('multer')
const upload = multer({ dest: './StudProPic/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Student s INNER JOIN Course c ON s.course_id=c.course_id INNER JOIN Batch b ON s.batch_id=b.batch_id`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/register',upload.single('stud_propic'), (request, response) => {
    const {stud_name, stud_email, stud_prn, stud_gender, stud_bdate, stud_password, course_id, batch_id} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(stud_password)

    const stud_propic = request.file.filename

    const connection = db.connect()
    const statement1 = `select * from Student where stud_email = '${stud_email}'`
    connection.query(statement1, (error, users) => {

        if (users.length == 0) {
            // user with the required email does not exist

            // insert a new record
            const statement = `INSERT INTO Student (stud_name, stud_email, stud_prn, stud_gender, stud_bdate, stud_propic, stud_password, course_id, batch_id) values ('${stud_name}', '${stud_email}', ${stud_prn}, '${stud_gender}', '${stud_bdate}', '${stud_propic}', '${encryptedPassword}', ${course_id}, ${batch_id})`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            // user with email already exists
            connection.end()
            response.send(utils.createResult('email exists. please use another email.'))
        }

    })
    
})

router.put('/:stud_id', (request, response) => {
    const {stud_id} = request.params
    const {stud_name, stud_email, stud_prn, stud_gender, stud_bdate, stud_propic, stud_password, course_id, batch_id} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(stud_password)
    const connection = db.connect()
    const statement = `update Student set stud_name='${stud_name}', stud_email='${stud_email}', stud_prn=${stud_prn}, stud_gender='${stud_gender}', stud_bdate='${stud_bdate}', stud_propic='${stud_propic}',stud_password = '${encryptedPassword}', course_id=${course_id}, batch_id=${batch_id} where stud_id = ${stud_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:stud_id', (request, response) => {
    const {stud_id} = request.params
    const connection = db.connect()
    const statement = `delete from Student where stud_id = ${stud_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/login', (request, response) => {
    const {stud_email, stud_password} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(stud_password)
    const connection = db.connect()
    const statement = `select * from Student where stud_email = '${stud_email}' and stud_password = '${stud_password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        console.log(users);
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                stud_name: user['stud_name'],
                stud_email: user['stud_email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

module.exports = router