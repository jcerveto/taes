import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import machineRoutes from './routes/machineRoutes.js';
import cookieParser from "cookie-parser";
import { User } from './model/User.js';
import { generateAdminToken, generateRefreshToken, generateToken } from './helpers/generateTokens.js';
import { Incident } from './model/Incidents.js'

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
    res.clearCookie("adminToken");
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

        if (user.type === 'admin') {
            generateAdminToken(user.email, res);
        }

        res.json({ token, expiresIn, name: user.name, uid: email});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/admin', async (req, res) => {
    try {
        let adminTokenCookie = req.cookies?.adminToken;
        if (!adminTokenCookie) throw new Error("No existe el adminToken");

        const { uid } = jwt.verify(adminTokenCookie, 'codigo_secreto_a_poner_en_el_env');

        const user = await User.read(uid);

        if (user.type !== 'admin') {
            throw new Error("User is not an admin");
        }

        return res.json({ admin: true });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ admin: false });
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
        cleanUser.type = req.body.type;

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
/*
app.get('/incidents', async (req, res) => {
    try {
        const incidents = await Incident.readAll();
        res.json(incidents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/incidents', async (req, res) => {
    try {
        const cleanIncident = new Incident();
        cleanIncident.incidencia = req.body;
        console.log("cleanIncidents: ", cleanIncident);
        await cleanIncident.create();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

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


app.post('/incidents', async (req, res) => {
    const { email, machineId, machineName, machineBuilding, text } = req.body;
    if (!email || !text) {
        return res.status(400).json({ error: "Email and text are required" });
    }

    try {
        const newIncident = new Incident();

        newIncident.email = email;
        newIncident.machineId = machineId;
        newIncident.machineName = machineName;
        newIncident.machineBuilding = machineBuilding;
        newIncident.text = text;
        newIncident.status = "open";

        await newIncident.save();
        res.status(201).json(newIncident.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/incidents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const incident = await Incident.findById(id);
        if (!incident) {
            return res.status(404).json({ error: "Incident not found" });
        }
        await incident.delete();
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/incidents', async (req, res) => {
    try {
        const incidents = await Incident.readAll();
        res.json(incidents.map(incident => incident.toJSON()));
    } catch (error) { 
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/incidents/:email', async (req, res) => {
    try {
        
        const { email } = req.params;
        const incidents = await Incident.findByEmail(email);
        res.json(incidents.map(incident => incident.toJSON()));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/incidents', async (req, res) => {
    const { uuid, email, machineId, machineName, machineBuilding, text, status } = req.body;

    try {
        const incident = await Incident.findById(uuid);
        if (!incident) {
            return res.status(404).json({ error: "Incident not found" });
        }

        console.log("Hola soy el put: ", incident.toJSON());
        // Actualización de los datos de la incidencia
        incident.email = email;
        incident.machineId = machineId;
        incident.machineName = machineName;
        incident.machineBuilding = machineBuilding;
        incident.text = text;
        incident.status = status;

        await incident.update();  // Guarda los cambios en la base de datos
        res.json(incident.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

