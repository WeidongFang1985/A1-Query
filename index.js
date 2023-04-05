const express = require('express');
const cors = require('cors');
const musicRouter = require("./routes/musics");

const app = express();

app.listen(8080,err => {
	if (err) {
		console.log(err)
		process.exit(1)
	}
	console.log("SERVER STARTED")
})

app.use(cors());
app.use(express.json())

app.use('/api/v1',musicRouter);

module.exports = app;