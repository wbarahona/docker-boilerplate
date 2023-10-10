const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const { engine } = exphbs;

const app = express();
const port = 3000;

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'src', 'views', 'layouts'),
  })
);
app.set('view engine', '.hbs');
app.set('views', './app/src/views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
