const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const db = require('./models')

const areasRouter = require('./routes/areasRoutes')
const questionsRouter = require('./routes/questionsRoutes')
app.use('/areas', areasRouter)
app.use('/questions', questionsRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001!')
    })
})