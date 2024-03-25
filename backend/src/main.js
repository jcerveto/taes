import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

import { User } from './model/User.js';


const app = express();

const PORT = 3000;

app.use(express.json());

// MIddleware para loggear las peticiones
app.use(morgan('dev'));

// TODO: Allow CORS requests from your Vue.js application's URL
//app.use(cors({ origin: 'http://0.0.0.0:8080', credentials: true })); // Replace with your Vue.js app's URL
app.use(cors());


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
        
        // creamos un token de sesión
        const tokenDeSesion = jwt.sign({ email }, 'secreto', { expiresIn: '7d' });

        /*const userTokenPayload = {
            username: user.name,
        };
    
        // Generate the user token with the payload and a different secret key
        jwt.sign(userTokenPayload, 'user_secret', { expiresIn: '1h' }); // Shorter expiration for user tokens*/
      

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
 * @param {User} name
 * @param {string} surname
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 * @throws {Error} If the user is not created
 */
app.post('/user', async (req, res) => {
    try {
        console.log("creating: ", req.body);
        
        const cleanUser = new User();
        cleanUser.name = req.body.name;
        cleanUser.surname = req.body.surname;
        cleanUser.username = req.body.username;
        cleanUser.email = req.body.email;
        cleanUser.password = req.body.password;
        cleanUser.bornDate = new Date(req.body.bornDate);

        console.log("cleanUser: ", cleanUser);
        await cleanUser.create();
        console.log("cleanUser: ", cleanUser);        
        res.json(cleanUser.toJSON());
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        console.log("updating: ", req.body);
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.surname = req.body.surname;
        user.username = req.body.username;
        user.password = req.body.password;

    
        await user.update();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = new User();
        user.email = req.params.id;
        await user.delete();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})


