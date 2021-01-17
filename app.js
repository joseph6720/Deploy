const express = require('express');
app = express();

app.get('/', (req, res) => {
	res.status(200).send('Hello World Joseph Amazon');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
