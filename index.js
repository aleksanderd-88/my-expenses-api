const express = require('express')
const app = express()
const PORT = process.env.PORT || 1234
const cors = require('cors')
const routes = require('./src/routes')
require('./src/config/atlas_connect')

app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(PORT, () => console.log(`Server up and running on port: ${ PORT }`))