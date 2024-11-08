import { pool } from '../config/database.js';

// gets all restaurants
const getRestaurants = async () => {
        const result = await pool.query('SELECT * FROM restaurants;');
        return result.rows;
};

// getting the details of a restaurant with id 
const getRestaurant = async (id) => {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1;', [id]);
        return result.rows[0];
};

// adding new restaurant to the database 
const createRestaurant = async (newRestaurant) => {
        const { name, phone, address, photo } = newRestaurant;
        const result = await pool.query(
                'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *;',
                [name, phone, address, photo]
        );
        return result.rows[0];
};

//deleting restaurant entries ussing the appropriate id
const deleteRestaurant = async (id) => {
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *;', [id]);
        return result.rows[0];
        
};

//gets the reviews for corresponding with restaurant id 
const getReviewsForRestaurant = async (id) => {
        const query = 'SELECT * FROM reviews WHERE restaurant_id = $1;';
        const result = await pool.query(query, [id]);
        return result.rows; 
};

//updates restaurant entries 
const updateRestaurant = async (id, data) => {
        const restaurant = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        const currentRestaurant = restaurant.rows[0];
        
        const updatedRestaurant = {
                ...currentRestaurant,
                ...data
        };
        
        const { name, phone, address, photo } = updatedRestaurant;
        
        const result = await pool.query(
                'UPDATE restaurants SET name = $1, phone = $2, address = $3, photo = $4 WHERE id = $5 RETURNING *;',
                [name, phone, address, photo, id]
        );
        
        return result.rows[0]; 
};


export { updateRestaurant,createRestaurant, deleteRestaurant, getRestaurant, getRestaurants, getReviewsForRestaurant };
