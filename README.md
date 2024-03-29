<div align="center">
  <img src="resources/readme/logo.png" alt="maquinua">
</div>


#### Encuentra la mejor máquina expendedora cuando más la necesitas.
<hr>



[![license](https://img.shields.io/github/license/nhn/tui.editor.svg)](https://github.com/nhn/tui.editor/blob/master/LICENSE) 
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.editor/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) 



# ![maquinua's interface](resources/readme/screenshot.png)


### Proyecto creado durante el curso 2023-2024 en la asignatura de **TAES** (*TÉCNICAS AVANZADAS DE ESPECIFICACIÓN SOFTWARE*) de la [Escola Politècnica Superior](https://eps.ua.es/) en la [Universitat d'Alacant](https://www.ua.es/).


## 🚩 Tabla de contenidos

- [¿Por qué usar maquinua?](#why-maquinua)
- [Levantar el proyecto en local](#levantar-el-proyecto-en-local)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Maquinua Team](#maquinua-team)
- [Reportar un problema](#reporting)
- [Contributing](#contributing)
- [License](#license)



<a id="why-maquinua"></a>
## 🤖 ¿Por qué *maquinua*?

**maquinua** es una aplicación web que te permite encontrar la máquina expendedora más cercana a tu ubicación en la [Universitat d'Alacant](https://www.ua.es/). Puedes filtrar por tu facultad, nombre del producto y muchos más. Encontrás la ubicación de la máquina en un mapa.

### 🔎 Tipos de filtros.

- **Facultad**: Filtra por la facultad en la que te encuentras.
- **Tipo de máquina**: Filtra por el tipo de máquina que buscas.
- **Nombre del producto**: Filtra por el nombre del producto que buscas.
- **Precio del producto**: Filtra por el precio del producto que buscas.
- **Empresa**: Filtra por la empresa que gestiona la máquina.



<a id="levantar-el-proyecto-en-local"></a>
## 🚀 Levantar el proyecto en local

### Descarga el proyecto en tu máquina local siguiendo los siguientes pasos:

```sh
git clone https://github.com/jcerveto/maquinua.git
cd maquinua
```


### Levanta la página web en tu máquina local siguiendo los siguientes pasos:

Ves a la carpeta `frontend/maquinua`.
```sh
cd frontend/maquinua
```

Descarga las dependencias del proyecto.
```
npm install
```

Compiles and hot-reloads for development
```
npm run serve
```

Lints and fixes files
```
npm run lint
```

Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<hr>

### Levanta la base de datos en tu máquina local siguiendo los siguientes pasos:

Ves a la carpeta `backend`.
```sh
cd backend
```

Ejecuta el `docker-compose` para levantar la base de datos y el servidor **HTTP**.
```sh
docker-compose up -d
```

### Con más detalles:
Levantar todo: BBDD (MongoDB) + Backend HTTP (NodeJs Express)
```sh
docker-compose up
```

Se pueden levantar por separado los contenedores. Pero habría que configurar también la *network*. 

Levantar base de datos
```sh
docker-compose run <container-name>
```

Una vez el contenedor ya esté corriendo, podemos entrar dentro con el siguiente comando:
```sh
docker exec -it backend-maquinua-container sh
```
Desde aquí podemos ejecutar test como `node src/services/db.test.js` de manera interactiva.

**¡OJO en Windows!**
Si estás en Windows y no te funciona, aasegúrate de estar ejecutando Docker desktop, no solamente los comandos por terminal. 



<a id="tecnologías-utilizadas"></a>
## 🛠 Tecnologías utilizadas
En este proyecto se han utilizado las siguientes tecnologías:

### Node.js
![Node.js](/resources/readme/node.png)

### Vue.js
![Vue.js](/resources/readme/vue.png)

### Express.js
![Express.js](/resources/readme/express.jpg)

### Git
![Git](/resources/readme/git.png)

### Docker
![Docker](/resources/readme/docker.png)

### MongoDB
![MongoDB](/resources/readme/mongodb.png)

### OpenStreetMap
![OpenStreetMap](/resources/readme/openstreetmap.png)



<a id="maquinua-team"></a>
## 📚 Maquinua Team

### Profesorado
* Javier Fernández Martínez
* Pla Sempere, Leopoldo

### Alumnado
* Joan Cerveto Serrano
* Adrián Romero Romero
* etc

![UA](/resources/readme/logo-ua.jpg)
![EPS](/resources/readme/eps-ua.png)


<a id="reporting"></a>
## 🚨 Reportar un problema

* Crea un [Issue](https://github.com/jcerveto/taes/issues/new) en este repositorio.
* Explica claramente el problema y proporciona información sobre cómo reproducirlo.


<a id="contributing"></a>
## 💬 Contributing

### Colabora con nosotros para mejorar **maquinua**.
Ves a [Contributing.md](CONTRIBUTING.md) para más información.


<a id="license"></a>
## 📜 License

This software is licensed under the [APACHE VERSION 2.0](LICENSE.md).
