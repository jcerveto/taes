<template>
  <div class="login-container">
    <div class="form-container">
        <h2>{{  $t("inicio_sesion") }}</h2>

      <br>
      <form @submit.prevent="signIn" class="form">
        <div class="form-group">
            <label for="email">{{  $t("correo_electronico") }}:</label><br>
          <input class="form-control" type="email" id="email" v-model="email" required>
        </div>
        <br>
        <div>
            <label for="password">{{  $t("contrasenya") }}:</label><br>
          <input class="form-control" type="password" id="password" v-model="password" required>
        </div>
        <div>
          <br>
          <button class="btn custom-btn-color" type="submit">{{  $t("inicio_sesion") }}</button>
        </div>
      </form>
      <br>
      <p>{{  $t("no_cuenta") }}</p>
      <router-link to="/register">{{  $t("registrate") }}</router-link>
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
  
<style scoped>
  .login-container {
    background-image: url('~@/assets/backgroundhd.png');
    background-size: cover;
    background-position: center;
    height: 84vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }

  .custom-btn-color {
    text-align: center;
    color: white;
    background-color: #7fcaad;
  }
  
  .custom-btn-color:hover {
    color: white;
    background-color: #5a917b;
  }

  .form-control {
    max-width: 200px;
  }
</style>
