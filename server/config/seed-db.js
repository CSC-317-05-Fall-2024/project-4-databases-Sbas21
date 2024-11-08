import { pool } from './database.js';

const dropTables = async () => {
    try {
        console.log('Dropping existing tables...');
        const dropReviewsQuery = `
        DROP TABLE IF EXISTS reviews;
    `;
    await pool.query(dropReviewsQuery);

        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
    `;
    await pool.query(dropTablesQuery);

        console.log('Tables dropped successfully.');
    } catch (error) {
        console.error(error);
    }
};

const createTables = async () => {
    try {
        console.log('Creating restaurants table...');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                photo TEXT
            );
        `;
        await pool.query(createTableQuery);

        console.log('Creating reviews table...');
        const createReviewTableQuery = `
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                rating INTEGER NOT NULL,
                content TEXT NOT NULL,
                restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createReviewTableQuery);
        console.log('Tables created successfully.');

    } catch (error) {
        console.error(error);
    }
};

const insertData = async () => {
    try {
        console.log('Inserting initial restaurant data...');
        const insertDataQuery = `
            INSERT INTO restaurants (name, phone, address, photo) VALUES
            ('Nasi Kandar Pelita', '+60 3-2162 5532', '149, Jalan Ampang, 50450 Kuala Lumpur', '/images/nkp.jpg'),
            ('Betel Leaf', '+60 3-2032 5932', '77a, Leboh Ampang, Kuala Lumpur', '/images/betelLeaf.jpeg'),
            ('Bottega KL', '+603-2070 4222', '1A, Jalan Ceylon, Bukit Ceylon, Kuala Lumpur', '/images/BottegaKL.png'),
            ('Ho Kow Kopitiam', '+60 3-2022 1889', '1 Jalan Balai Polis, Kuala Lumpur', '/images/hoKowKopitiam.jpg'),
            ('Cendol Durian', '+60 19-262 7672', '47B, Jalan Raja Alang, Kuala Lumpur', '/images/cendolDurian.jpeg'),
            ('Burger Lab', '+60 17-282 8150', '14, Jalan 21/22, Petaling Jaya', '/images/burgerLab.png'),
            ('Village Park Restaurant', '+60 3-7710 7860', '5, Jalan SS 21/37, Petaling Jaya', '/images/villagePark.jpg'),
            ('Wong Kee', '+60 3-2144 3750', '30, Jalan Nyonya Pudu, Kuala Lumpur', '/images/wongKee.jpg'),
            ('Lim Fried', '+60 17-316 3287', '14, Jalan SS2/10, SS2, Petaling Jaya', '/images/limFried.jpg');
        `;
        await pool.query(insertDataQuery);
        console.log('Initial restaurant data inserted successfully.');

        console.log('Inserting initial review data...');
        const insertReviewDataQuery = `
            INSERT INTO reviews (rating, content, restaurant_id) VALUES
            (5, 'Great food! The environment was amazing! ', 1),
            (0, 'Customer service sucked here. Totally would not recommend. Please get a new manager.', 1), 
            (2, 'Nice ambiance, but a bit crowded. The front desk was not responsive..', 1), 
            (5, 'Lovely place for a family dinner.', 2),
            (5, 'Exceptional flavors and friendly staff!', 2),
            (1, 'Good food but service was slow. The food was also served cold... I do not recommend this restaurant!', 3);
        `;
        await pool.query(insertReviewDataQuery);
        console.log('Initial review data inserted successfully.');

    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
};

setup();
