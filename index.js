const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Open AI Configuration
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Express Configuration
const app = express()
const port = 3080

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))


// Routing 

// Primary Open AI Route
app.post('/', async (req, res) => {
	const { message } = req.body;
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{ role: "user", content: `${message}` }],
	});
	res.json({
		message: response.data.choices[0].message.content,
	})
});

// Get Models Route
app.get('/models', async (req, res) => {
	const response = await openai.listEngines();
	res.json({
		models: response.data
	})
});

// Start the server
app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
});