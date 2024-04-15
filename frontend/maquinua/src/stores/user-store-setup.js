import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios.js";

export const useUserStore = defineStore("user", () => {

  const uid = ref(null);
  const user = ref(null);
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email, password) => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });
      
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      user.value = res.data.name;
      uid.value = res.data.uid;
      
      sessionStorage.setItem("user", "🔥🔥");
      setTime();
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    try {
      const res = await api.get("/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      setTime();
    } catch (error) {
      localStorage.removeItem("user");
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      localStorage.removeItem("user");
    }
  };

  const resetStore = () => {
    uid.value = null;
    user.value = null;
    token.value = null;
    expiresIn.value = null;
  };

  return {
    uid,
    user,
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
  };
});
