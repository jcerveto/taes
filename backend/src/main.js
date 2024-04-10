import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { User } from './model/User.js';
import { Incidents } from './model/Incidents.js'


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
        cleanUser.name = req.body.name;
        // TODO apellidos en la bbdd
        cleanUser.email = req.body.email;
        cleanUser.password = req.body.password;
        cleanUser.bornDate = new Date(req.body.bornDate);

        console.log("cleanUser: ", cleanUser);
        
        await cleanUser.create();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const cleanUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };

        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.bornDate = req.body.bornDate;
    
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

app.get('/incidents', async (req, res) => {
    try {
        const incidents = await Incidents.readAll();
        res.json(incidents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/incidents', async (req, res) => {
    try {
        const cleanIncident = new Incidents();
        cleanIncident.incidencia = req.body;
        console.log("cleanIncidents: ", cleanIncident);
        await cleanIncident.create();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
/**
app.delete('/incidents/:id', async (req, res) => {
    try {
        await Incidents.delete(req.params.id);
        res.json({ message: 'Incident deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
**/
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})


