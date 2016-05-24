import express from 'express'

const app = express();

app.get('/:params?*', function(req, res) {
	return res.status(200).send('Hello!');
})