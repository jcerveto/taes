<template>
    <div>
        <h1>Admin Login</h1>
        <form @submit.prevent="login">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <br>
            <button type="submit">Login</button>
        </form>

        {{ text }}
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useUserStore } from "../stores/user-store-setup";
    //import { useRouter } from "vue-router";

    //const router = useRouter();
    const userStore = useUserStore();
    
    const email = ref("");
    const password = ref("");
    const text = "";

    const login = async () => {
      try {
        await userStore.access(email.value, password.value);

        email.value = "";
        password.value = "";

        const admin = await userStore.isAdmin(email.value);

        if (admin) text.value = "ADMIN LOGEADO CORRECTAMENTE";
      } catch (error) {
        console.error(error);
      }
    }
</script>