const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = 8000

const app = express()

app.listen(PORT, () => console.log(`server running on http://localhost:${ PORT }`))

app.get('/', (req, res) => {
	res.json('Welcome to the Climate Change News API')
})

app.get('/news', (req, res) => {
	axios.get('https://www.theguardian.com/environment/climate-crisis')
		.then((response) => {
			const html = response.data
			const $ = cheerio.load(html)
			const articles = []

			$('a:contains("climate")', html).each(function () {
				const title = $(this).text()
				const url = $(this).attr('href')

				articles.push({
					title,
					url,
				})
			})

			res.json(articles)
		}).catch((err) => console.log(err))
})
