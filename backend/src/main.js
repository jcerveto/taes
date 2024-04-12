import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import machineRoutes from './routes/machineRoutes.js';
import cookieParser from "cookie-parser";
import { User } from './model/User.js';
import { generateRefreshToken, generateToken } from './helpers/generateTokens.js';


const app = express();

app.use(cookieParser());

const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:8080', // Your Vue.js application's URL
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
  }));


app.use(express.json());

// MIddleware para loggear las peticiones
app.use(morgan('dev'));

// TODO: Allow CORS requests from your Vue.js application's URL
const whiteList = ['http://localhost:8080'];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                "Error de CORS origin: " + origin + " No autorizado!"
            );
        },
        credentials: true,
    })
);

app.use('/api', machineRoutes);

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

app.get('/refresh', async (req, res) => {
    try {
        let refreshTokenCookie = req.cookies?.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el refreshToken");

        console.log(refreshTokenCookie);

        const { id } = jwt.verify(refreshTokenCookie, 'codigo_secreto_a_poner_en_el_env');

        const { token, expiresIn } = generateToken(id);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: error.message });
    }
});

app.get('/logout', async (req, res) => {
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.read(email);
        console.log("user: ", user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const { token, expiresIn } = generateToken(user.email);
        generateRefreshToken(user.email, res);

        res.json({ token, expiresIn, name: user.name, uid: email});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/register', async (req, res) => {
    try {  
        const cleanUser = new User();
        cleanUser.name = req.body.name;
        cleanUser.surname = req.body.surname;
        cleanUser.username = req.body.username;
        cleanUser.email = req.body.email;
        cleanUser.password = req.body.password;
        cleanUser.bornDate = new Date(req.body.bornDate);

        try{
            const user = await User.read(req.body.email);
            if (user) {
                return res.status(403).json({ error: 'User already exists' });
            }
        } catch (error) {
            //console.error(error);
        }

        await cleanUser.create();

        const { token, expiresIn } = generateToken(cleanUser.email);
        generateRefreshToken(cleanUser.email, res);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ error: error.message });
    }
});

/**
 * Returns a user by email: readUser
 * @param {string} email
 * @returns {Promise<User>}
 */
app.get('/users', async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        const user = await User.read(email);

        res.json(user.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const email = req.params.id;

       console.log(email);
       const user = await User.read(email);

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

        res.json(cleanUser.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/users', async (req, res) => {
    try {
        console.log("updating: ", req.body);

        const user = await User.read(req.body.email);
        const updatedUser = new User();
        console.log("User: ", user);
        updatedUser.username = req.body.username;
        updatedUser.email = user.email;
        updatedUser.name = req.body.name;
        updatedUser.surname = req.body.surname;
        updatedUser.password = req.body.password;

        await updatedUser.update(); // Wait for the update to complete
        res.json(user.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const email = req.params.id; // Destructure from request body
        const user = await User.read(email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.delete();
        console.log("User deleted: ", email);
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/update-machine', async (req, res) => {
    try {
        const updatedMachine = req.body;
        const filePath = path.join(path.resolve(), 'public/maquinas.json');

        const data = await fs.promises.readFile(filePath, 'utf8');
        let machines = JSON.parse(data);
        const index = machines.findIndex(m => m.id === updatedMachine.id);
        
        if (index === -1) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        
        machines[index] = updatedMachine;

        await fs.promises.writeFile(filePath, JSON.stringify(machines, null, 2), 'utf8');
        res.json({ message: 'Machine updated successfully', updatedMachine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/update-machine', async (req, res) => {
    const { id, newProduct, newPrice } = req.body;
    const filePath = path.join(path.resolve(), 'public/maquinas.json');

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        let machines = JSON.parse(data);
        const machine = machines.find(machine => machine.id === id);

        if (!machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }

        machine.lista_productos.push(newProduct);
        machine.lista_precios.push(parseFloat(newPrice));

        await fs.promises.writeFile(filePath, JSON.stringify(machines, null, 2), 'utf8');
        res.json({ message: 'Product added successfully', machine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})


