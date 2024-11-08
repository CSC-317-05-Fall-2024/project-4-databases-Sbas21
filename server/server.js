import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurant, getRestaurants,getReviewsForRestaurant} from './data/restaurants.js'; // import the restaurant data
import { backendRouter } from './routes/api.js';


const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//serves up static files from the public folder
app.use(express.static('public'));
app.use(express.json()); 
app.use('/api', backendRouter);
//use ejs as the view engine in express 
app.set('view engine', 'ejs');

//serves up index.html file 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//serves up static files (attractions.html) from public folder
app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

//serves up new-restaurant from public/newRestaurant.html 
app.get('/new-restaurant', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newRestaurant.html'));
});

// route to get the list of all restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await getRestaurants();
    res.render('restaurants', { restaurants }); //renders the list of all restaurants with the restaurant.ejs file
});

// route to get details of a specific restaurant by it's id 
app.get('/restaurants/:id', async (req, res) => { 
    const id = parseInt(req.params.id);     //converts parameter id to int
    const restaurant = await getRestaurant(id);   //fetches specific restaurant
    const reviews = await getReviewsForRestaurant(id); // fetches reviews for the restaurant
    res.render('restaurant-details', { restaurant, reviews });   //renders the list of all restaurants with the restaurant.ejs file
}); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
