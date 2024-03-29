const express = require('express')
const bodyParser = require('body-parser')

// import the routers
const routerStudent = require('./student')
const routerFaculty = require('./faculty')
const routerFacultyType = require('./facultytype')
const routerCourseCo = require('./course_coordi')
const routerCourse = require('./course')
const routerBatch = require('./batch')
const routerVenue = require('./venue')
const routerQueries = require('./queries')
const routerClassType = require('./classtype')
const routerQryAns = require('./qryans')
const routerSubject = require('./subject')
const routerCourseSub = require('./coursesub')
const routerQuestion = require('./question')
const routerPer = require('./performance')
const routerDailySchedule = require('./dailyschedule')
const routerInstruction = require('./instruction')
const routerStudyMaterial = require('./studymaterial')
const routerRank = require('./rank')

const app = express()

// add middlewares

// for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use(express.static('FacProPic'))
app.use(express.static('StudProPic'))
app.use(express.static('StudyMaterial'))
app.use(express.static('InstructionDoc'))
app.use('/student', routerStudent)
app.use('/faculty', routerFaculty)
app.use('/facultytype', routerFacultyType)
app.use('/course_coordi', routerCourseCo)
app.use('/course', routerCourse)
app.use('/batch', routerBatch)
app.use('/venue', routerVenue)
app.use('/classtype', routerClassType)
app.use('/queries', routerQueries)
app.use('/qryans', routerQryAns)
app.use('/subject', routerSubject)
app.use('/coursesub', routerCourseSub)
app.use('/question', routerQuestion)
app.use('/performance', routerPer)
app.use('/dailyschedule', routerDailySchedule)
app.use('/instruction', routerInstruction)
app.use('/studymaterial', routerStudyMaterial)
app.use('/rank', routerRank)

app.listen(4000, '0.0.0.0', () => {
    console.log('server started  on port 4000')
})