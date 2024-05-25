import express from 'express';
import { engine } from 'express-handlebars';
import { services } from "./informacion/servicios.data.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Configuración de Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('assets/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.get('/', (req, res) => {
    res.render('dashboard');
});

app.get('/services', (req, res) => {
    res.render('services', { services });
});
app.get('/services/:services', (req, res) => {
    const serviceUrl = req.params.services;
    const serviceRoute = `/services/${serviceUrl}`
    const service = services.find(s => s.url === serviceRoute);
    
    if (service) {
        res.render('servicesdetalle', { service });
    } else {
        res.status(404).render('paginaerror');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});
