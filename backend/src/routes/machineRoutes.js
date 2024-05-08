// Importing dependencies
import express from 'express';
import fs from 'fs';
import path from 'path';


// Create a new router for the machine routes
const router = express.Router();




// Route to update a vending machine's details
router.post('/update-machine', async (req, res) => {
    try {
        // Get the updated machine data from the request body
        const updatedMachine = req.body;
        // Construct the path to the maquinas.json file
        const filePath = path.join(path.resolve(), 'public/maquinas.json');
        console.log("Resolved File Path:", filePath);

        // Read the current data from maquinas.json
        const data = await fs.promises.readFile(filePath, 'utf8');
        let machines = JSON.parse(data);

        // Find the index of the machine to be updated
        const index = machines.findIndex(m => m.id === updatedMachine.id);
        if (index === -1) {
            // If the machine isn't found, return a 404 error
            return res.status(404).json({ message: 'Machine not found' });
        }
        
        // Update the machine's data in the array
        machines[index] = updatedMachine;

        // Write the updated array back to maquinas.json
        await fs.promises.writeFile(filePath, JSON.stringify(machines, null, 2), 'utf8');
        
        // Respond with a success message and the updated machine data
        res.json({ message: 'Machine updated successfully', updatedMachine });
    } catch (error) {
        // If an error occurs, log it and return a 500 server error response
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Add route for deleting a vending machine
router.delete('/delete-machine/:id', async (req, res) => {
    const machineId = parseInt(req.params.id, 10);
    const filePath = path.join(path.resolve(), 'public/maquinas.json');

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        let machines = JSON.parse(data);

        const index = machines.findIndex(m => m.id === machineId);
        if (index === -1) {
            return res.status(404).json({ message: 'Machine not found' });
        }

        machines.splice(index, 1); // Remove the machine from the array

        await fs.promises.writeFile(filePath, JSON.stringify(machines, null, 2), 'utf8');
        res.json({ message: 'Machine deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Route to add a new vending machine
router.post('/NewMachine', async (req, res) => {
    try {
        const newMachine = {
            ...req.body,
            type: '',
            lista_productos: [],
            lista_precios: []
        };
        
        const filePath = path.join(path.resolve(), 'public/maquinas.json');
        const data = await fs.promises.readFile(filePath, 'utf8');
        const machines = JSON.parse(data);

        let lastId = 0;
        if (machines.length > 0) {
            // Get the last ID from the last machine
            lastId = machines[machines.length - 1].id;
        }

        // Set the new ID as the last ID + 1
        newMachine.id = lastId + 1;

        machines.push(newMachine); // Add new machine to the array

        await fs.promises.writeFile(filePath, JSON.stringify(machines, null, 2), 'utf8');
        res.json({ message: 'Machine added successfully', newMachine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



// Export the router
export default router;
