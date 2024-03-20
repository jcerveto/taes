# Levantar todo: BBDD (MongoDB) + Backend HTTP (NodeJs Express)
```bash
docker-compose up
```

Se pueden levantar por separado los contenedores. Pero habría que configurar también la network. 
# Levantar base de datos
```bash
docker-compose run <container-name>
```

Una vez el contenedor ya esté corriendo, podemos entrar dentro con el siguiente comando:
```bash
docker exec -it backend-maquinua-container sh
```
Desde aquí podemos ejecutar test como `node src/services/db.test.js` de manera interactiva.

# ¡OJO en Windows!
Si estás en Windows y no te funciona, aasegúrate de estar ejecutando Docker desktop, no solamente los comandos por terminal. 

