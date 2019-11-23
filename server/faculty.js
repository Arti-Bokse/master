const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')
const multer =require('multer')
const upload = multer({ dest: './FacProPic/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Faculty f INNER JOIN FacultyType ft ON f.factype_id=ft.factype_id`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/register',upload.single('fac_propic'), (request, response) => {
    const {fac_name, fac_email, factype_id, fac_gender, fac_bdate, fac_password} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(fac_password)

    const fac_propic = request.file.filename

    const connection = db.connect()
    const statement1 = `select * from Faculty where fac_email = '${fac_email}'`
    connection.query(statement1, (error, users) => {

        if (users.length == 0) {
            
            const statement = `INSERT INTO Faculty (fac_name, fac_email, factype_id, fac_gender, fac_propic, fac_bdate, fac_password) values ('${fac_name}', '${fac_email}', ${factype_id}, '${fac_gender}', '${fac_propic}', '${fac_bdate}', '${encryptedPassword}')`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            connection.end()
            response.send(utils.createResult('email exists. please use another email.'))
        }

    })

})

router.put('/:fac_id', (request, response) => {
    const { fac_id } = request.params
    const {fac_name, fac_email, factype_id, fac_gender, fac_propic, fac_bdate, fac_password} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(fac_password)
    const connection = db.connect()
    const statement = `update Faculty set fac_name='${fac_name}', fac_email='${fac_email}', factype_id=${factype_id}, fac_gender='${fac_gender}', fac_propic='${fac_propic}', fac_bdate='${fac_bdate}',fac_password = '${encryptedPassword}' where fac_id = ${fac_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:fac_id', (request, response) => {
    const { fac_id } = request.params
    const connection = db.connect()
    const statement = `delete from Faculty where fac_id = ${fac_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/login', (request, response) => {
    const { fac_email, fac_password } = request.body
    const encryptedPassword = '' + cryptoJs.MD5(fac_password)
    const connection = db.connect()
    const statement = `select * from Faculty where fac_email = '${fac_email}' and fac_password = '${encryptedPassword}'`
    connection.query(statement, (error, users) => {
        connection.end()
        console.log(users);

        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                fac_email: user['fac_email'],
                fac_password: user['fac_password']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

module.exports = router