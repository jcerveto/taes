<template>
  <div class="register-container">
  <div class="form-container">
    <div class="mis-datos">
      <h2>Mis Datos</h2>

      <div class="propiedad" v-for="(prop, index) in propiedades" :key="index">
        <label>{{ prop.label }}</label>
        <p :style="{ color: prop.color }">{{ prop.value }}</p>
      </div>

      <a href="/user/mydata/myinfo" class="boton-enlace">Modificar Datos</a>
      <a href="/user/mydata/myinfo" class="boton-enlace2">Eliminar Perfil</a>
    </div>
  </div>

</div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      propiedades: [
        {
          label: "Usuario:",
          value: "",
          color: "blue"
        },
        {
          label: "Nombre:",
          value: "",
          color: "green"
        },
        {
          label: "Apellido:",
          value: "",
          color: "orange"
        },
        {
          label: "Fecha de Nacimiento:",
          value: "",
          color: "purple"
        },
        {
          label: "Correo Electrónico:",
          value: "",
          color: "red"
        }
      ]
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      // Simular obtención de datos del usuario
      this.email = 'test@example.com';
      await axios.post('http://localhost:3000/users', { email: this.email }, { withCredentials: true })
        .then((res) => {
          this.propiedades[0].value = res.data.username;
          this.propiedades[1].value = res.data.name;
          this.propiedades[2].value = res.data.surname;
          this.propiedades[3].value = new Date(res.data.bornDate).toLocaleDateString(); // Convertir a formato de fecha
          this.propiedades[4].value = res.data.email;
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error);
        });
    }
  }
};
</script>

<style>

  .register-container {
    background-image: url('~@/assets/background.png'); /* Ruta a tu imagen de fondo */
    background-size: cover;
    background-position: center;
    height: 100%; /* Ajusta la altura según tu necesidad */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .form-container {
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 10px;
  }

  .mis-datos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    font-size: 16px;
    margin: 20px;
  }

  .propiedad {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
    display: flex;
    flex-direction: column;
  }

  .propiedad label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .propiedad p {
    margin: 0;
  }

  /* Se eliminan los estilos individuales de las propiedades */

  /* Estilo para el enlace */

  .boton-enlace {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  .boton-enlace2 {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #fa0000;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  .boton-enlace:hover {
    background-color: #333;
  }

  /* Se agregan estilos dinámicos a las propiedades */

  .propiedad p {
    color: #000;
  }

  .propiedad p::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: #ccc;
  }

  .propiedad p::before {
    background-color: var(--color);
  }
</style>
