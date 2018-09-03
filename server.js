const express = require('express')
const compression = require('compression')

const PORT = process.env.PORT || 8080

const app = express()

app.use(compression())
app.use(express.static('dist'))

app.listen(PORT, () => console.log(`Express instance is listening on port ${PORT}`))
