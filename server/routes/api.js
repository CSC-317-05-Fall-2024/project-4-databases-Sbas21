import express from 'express';
const router = express.Router();

import { getReviewsForRestaurant, updateRestaurant,createRestaurant, deleteRestaurant, getRestaurant, getRestaurants } from '../data/restaurants.js';

// Add routes here
//route to handle restaurant page 
router.post('/restaurants', async (req, res) => {
    const newRestaurant = req.body;
    try {
        const createdRestaurant = await createRestaurant(newRestaurant); // Use createRestaurant here
        res.json(createdRestaurant); // Return the new restaurant object, including its ID
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).send('Error creating restaurant');
    }
});
router.get('/restaurants', async (req, res) => {      // API routing for /api/restaurants
    try {
        const restaurants = await getRestaurants(); // fetch restaurant data from database
        res.render('restaurants', { restaurants }); // render restaurant EJS file
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Error fetching restaurants" });
    }
});


router.get('/restaurants/:id', async (req, res) => {  // GET endpoint to fetch a restaurant by it's ID
    const id = parseInt(req.params.id);
    try {
        const restaurant = await getRestaurant(id);   // fetches a specific restaurant using getRestaurant function
        const reviews = await getReviewsForRestaurant(id); // fetches the associated reviews

        res.render('restaurant-details', { restaurant, reviews}); // render the EJS view directly with the restaurant variable
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": `${error.message}` });
    }
});

// DELETE endpoint to deleting a restaurant by id 
router.delete('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const restaurant = await deleteRestaurant(id);    // delete the restaurant using deleteRestaurant function
        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": `${error.message}` });
    }
});

router.patch('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const restaurantData = req.body;
    try {
        const updatedRestaurant = await updateRestaurant(id, restaurantData); // Use updateRestaurant function
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ "message": `${error}` });
    }
});


export { router as backendRouter };

