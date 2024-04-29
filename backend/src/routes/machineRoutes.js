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

router.put('/update-machine', async (req, res) => {
    console.log("pene")
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

// Route to get a single machine's details by ID
router.get('/machine/:id', async (req, res) => {
    const { id } = req.params;
    const filePath = path.join(path.resolve(), 'public/maquinas.json');
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      const machines = JSON.parse(data);
      const machine = machines.find(m => m.id === parseInt(id, 10));
      if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
      }
      res.json(machine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Export the router
export default router;
