const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = process.env.PORT || 8000

const app = express()

const articles = []
const newspapers = [
	{
		id: 'thetimes',
		name: 'The Times',
		base_url: 'https://www.thetimes.co.uk',
		route: '/environment/climate-change'
	}, {
		id: 'theguardian',
		name: 'The Guardian',
		base_url: 'https://www.theguardian.com',
		route: '/environment/climate-crisis'
	}, {
		id: 'telegraph',
		name: 'Telegraph',
		base_url: 'https://www.telegraph.co.uk',
		route: '/climate-change'
	}
]

newspapers.forEach(newspaper => {
	axios.get(`${ newspaper.base_url }${ newspaper.route }`).then(response => {
		const html = response.data
		const $ = cheerio.load(html)

		$('a:contains("climate")', html).each(function () {
			const title = $(this).text()
			const url = $(this).attr('href')
			const telegraph_base_url = (`${ newspaper.base_url }` !== 'https://www.telegraph.co.uk')

			articles.push({
				source: newspaper.name,
				title: title.toString().trim(),
				url: telegraph_base_url ? url : `${ newspaper.base_url }${ url }`
			})
		})
	}).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on http://localhost:${ PORT }`))

app.get('/', (req, res) => {
	res.json('Welcome to the Climate Change News API')
})

app.get('/news', (req, res) => {
	res.json(articles)
})
