<template>
  <div>
    <div v-if="isAdmin">
        <h2>{{  $t("admin_log_ok") }}e</h2>
        <router-link to="/">{{  $t("distribucion_maquinas") }}</router-link>
    </div>
    <div v-else>
        <h2>{{  $t("admin_log") }}</h2>
      <form @submit.prevent="login">
          <label for="email">{{  $t("correo_electronico") }}:</label>
        <input type="text" id="username" v-model="email" required>
        <br>
        <label for="password">{{  $t("contrasenya") }}:</label>
        <input type="password" id="password" v-model="password" required>
        <br>
        <button type="submit">{{  $t("inicio_sesion") }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store-setup";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
let isAdmin;

const checkAdmin = async () => {
  try {
    isAdmin = await userStore.isAdmin();
  } catch (error) {
    console.error(error);
  }
}

const login = async () => {
  try {
    await userStore.access(email.value, password.value);
    await checkAdmin();
    
    email.value = "";
    password.value = "";
  } catch (error) {
    console.error(error);
  }
}

checkAdmin(); // Llama a checkAdmin() al inicio
</script>
