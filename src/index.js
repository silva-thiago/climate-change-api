const express = require('express')

const PORT = 8000

const app = express()

app.listen(PORT, () => console.log(`server running on http://localhost:${ PORT }`))

app.get('/', (req, res) => {
	res.json('Welcome to the Climate Change News API')
})
