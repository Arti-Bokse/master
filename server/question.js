const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/:sub_id', (request, response) => {
    const { sub_id } = request.params
    const connection = db.connect()
    const statement = `select q.qs_id,q.qs_description,q.qs_opt_one,q.qs_opt_two,q.qs_opt_three,q.qs_opt_four,q.qs_ans,q.qs_ans_description,s.sub_name,st.stud_name from Question q INNER JOIN Subject s ON q.sub_id=s.sub_id INNER JOIN Student st ON q.stud_id=st.stud_id where q.sub_id='${sub_id}'`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const { qs_description, qs_opt_one, qs_opt_two, qs_opt_three, qs_opt_four, qs_ans, qs_ans_description, sub_id, stud_id } = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO Question (qs_description, qs_opt_one, qs_opt_two, qs_opt_three, qs_opt_four, qs_ans, qs_ans_description, sub_id, stud_id) values ('${qs_description}', '${qs_opt_one}', '${qs_opt_two}', '${qs_opt_three}', '${qs_opt_four}', '${qs_ans}', '${qs_ans_description}', ${sub_id}, ${stud_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })

})

router.put('/:qs_id', (request, response) => {
    const { qs_id } = request.params
    const { qs_description, qs_opt_one, qs_opt_two, qs_opt_three, qs_opt_four, qs_ans, qs_ans_description, sub_id, stud_id } = request.body
    const connection = db.connect()
    const statement = `update Question set qs_description='${qs_description}',qs_opt_one='${qs_opt_one}', qs_opt_two='${qs_opt_two}', qs_opt_three='${qs_opt_three}', 
    qs_opt_four='${qs_opt_four}', qs_ans='${qs_ans}', qs_ans_description='${qs_ans_description}', sub_id=${sub_id}, stud_id=${stud_id} where qs_id = ${qs_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:qs_id', (request, response) => {
    const { qs_id } = request.params
    const connection = db.connect()
    const statement = `delete from Question where qs_id = ${qs_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router