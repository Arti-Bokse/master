const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from DailySchedule ds INNER JOIN ClassType ct ON ds.classtype_id=ct.classtype_id INNER JOIN Venue v ON 
    ds.venue_id=v.venue_id INNER JOIN Subject s ON ds.sub_id=s.sub_id INNER JOIN Course c ON ds.course_id=c.course_id INNER JOIN Batch b ON
    ds.batch_id=b.batch_id INNER JOIN Faculty f ON ds.fac_id=f.fac_id`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/', (request, response) => {
    const {dsch_date,classtype_id,dsch_start,dsch_end,venue_id,sub_id,course_id,batch_id,fac_id} = request.body

    const connection = db.connect()
    // insert a new record
    const statement = `INSERT INTO DailySchedule (dsch_date,classtype_id,dsch_start,dsch_end,venue_id,sub_id,course_id,batch_id,fac_id) 
    values ('${dsch_date}',${classtype_id},'${dsch_start}','${dsch_end}',${venue_id},${sub_id},${course_id},${batch_id},${fac_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
    
})

router.put('/:dsch_id', (request, response) => {
    const {dsch_id} = request.params
    const {dsch_date,classtype_id,dsch_start,dsch_end,venue_id,sub_id,course_id,batch_id,fac_id} = request.body
    const connection = db.connect()
    const statement = `update DailySchedule set dsch_date='${dsch_date}',classtype_id=${classtype_id},dsch_start='${dsch_start}',dsch_end='${dsch_end}',venue_id=${venue_id},
    sub_id=${sub_id},course_id=${course_id},batch_id=${batch_id},fac_id=${fac_id} where dsch_id = ${dsch_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:dsch_id', (request, response) => {
    const {dsch_id} = request.params
    const connection = db.connect()
    const statement = `delete from DailySchedule where dsch_id = ${dsch_id}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router