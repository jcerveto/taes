// guardarArray.js
const fs = require('fs');
module.exports = function guardar_json(miArray) {
    
    const contenidoJSON = JSON.stringify(miArray);
    fs.writeFile('./palabras.json', contenidoJSON)
}
