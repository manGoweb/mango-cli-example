const express = require('express')
const compression = require('compression')

const app = express()

app.use(compression())
app.use(express.static('dist'))

app.listen(process.env.PORT, () => console.log(`Express instance is listening on port ${process.env.PORT}`))
