<template>
    <div class="login-container">
      <div class="form-container">
      <h2>Sign In</h2>
      <form @submit.prevent="signIn">
      
        <div>
          <label for="email">Email:</label><br>
          <input type="email" id="email" v-model="email" required>
        </div>
        <br>
        <div>
          <label for="password">Password:</label><br>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
            <br>
          <button type="submit">Sign In</button>
        </div>
      
      </form>
      <br>
      <p>Do not have an account yet?</p>
      <router-link to="/register">Register</router-link>
    </div>
  </div>
 
    
</template>

<script setup>
  import { ref } from "vue";
  import { useUserStore } from "../stores/user-store-setup";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const userStore = useUserStore();
  
  const email = ref("");
  const password = ref("");

  const signIn = async () => {
    try {
      await userStore.access(email.value, password.value);

      email.value = "";
      password.value = "";

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }
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
</style>