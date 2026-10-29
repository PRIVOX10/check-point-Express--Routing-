const path = require('path');
const express = require('express');
const { workingHours } = require('./middleware/workingHours');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(workingHours);

app.get('/', (req, res) => res.render('home', { title: 'Home', page: 'home' }));
app.get('/services', (req, res) => res.render('services', { title: 'Our Services', page: 'services' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Contact us', page: 'contact' }));

app.use((req, res) => res.status(404).render('closed', { title: 'Not found', page: '', notFound: true }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
