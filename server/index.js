const express = require('express')
const app = express()

app.use(express.json())

const db = require('./models')

const areasRouter = require('./routes/areasRoutes')
app.use('/areas', areasRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001!')
    })
})