const express = require('express');
app = express();
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index', {
		title   : 'My Express App',
		message : 'Hello Pug dynamic web'
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
