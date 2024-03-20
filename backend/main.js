import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import * as db from './services/db.js';
import { User } from './model/User.js';


const app = express();

const PORT = 3000;

app.use(express.json());

// MIddleware para loggear las peticiones
app.use(morgan('dev'));

// Allow CORS requests from your Vue.js application's URL
app.use(cors({ origin: 'http://localhost:8080', credentials: true })); // Replace with your Vue.js app's URL


app.get('/', async (req, res) => {
    res.send('Hello World!')
})


app.get('/users', async (req, res) => {
    try {
        const users = await User.readAll();
        // ver formato de respuesta, creo qye es Array<User>. Checkear q es correcto al hacer res.json()
        // COmprobarlo en todos los endpoints (funciones de express)
        res.json(users.map(user => user.toJSON()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Returns a user by email: readUser
 * @param {string} email
 * @returns {Promise<User>}
 */
app.post('/users', async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        const user = await User.read(email);

        const name = user.name;
        
        // creamos un token de sesión
        const tokenDeSesion = jwt.sign({ email, name }, 'secreto', { expiresIn: '7d' });
      

        // Establecemos el token
        res.cookie('tokenDeSesion', tokenDeSesion, { domain: 'localhost', sameSite: 'strict' });

        res.json(user.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Creates a new user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 * @throws {Error} If the user is not created
 */
app.post('/user', async (req, res) => {
    try {
        console.log("creating: ", req.body);

        const cleanUser = new User();
        cleanUser.username = req.body.username;
        cleanUser.name = req.body.name;
        cleanUser.surname = req.body.surname;
        cleanUser.email = req.body.email;
        cleanUser.password = req.body.password;
        cleanUser.bornDate = new Date(req.body.bornDate);

        console.log("cleanUser: ", cleanUser);
        
        const user = await db.createUser(cleanUser);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Updates a new user
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @param {Date} bornDate
 * @returns {Promise<User>}
 * @throws {Error} If the user is not updated
 */
app.put('/user', async (req, res) => {
    try {
        console.log("updating: ", req.body);
        const email = req.body.email;
        const user = await User.read(email);
        user.username = req.body.username;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.password = req.body.password;
        user.bornDate = new Date(req.body.bornDate);

        console.log("User: ", user);
        
        user.update();
        res.json(user.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await db.deleteUser(req.params.id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})


