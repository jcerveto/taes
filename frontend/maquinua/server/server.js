import * as ddbb from '../src/services/db.js';
import { User } from '../src/model/User.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Allow CORS requests from your Vue.js application's URL
app.use(cors({ origin: 'http://localhost:8080' })); // Replace with your Vue.js app's URL


app.get('/', async (req, res) => {
    res.send('Hello World!')
})


app.get('/users', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        // ver formato de respuesta, creo qye es Array<User>. Checkear q es correcto al hacer res.json()
        // COmprobarlo en todos los endpoints (funciones de express)
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await db.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const cleanUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        const user = await db.createUser(cleanUser);
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
        const user = await db.updateUser(req.params.id, cleanUser);
        res.json(user);
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
