import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios.js";

export const useUserStore = defineStore("user", () => {

  const uid = ref(null);
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
      uid.value = res.data.uid;
      
      localStorage.setItem("user", res.data.name);
      setTime();
      localStorage.setItem("email", email);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const isAdmin = async () => {
    try {
      const res = await api.get("/admin");

      return res.data.admin;
    } catch (error) {
      //console.log(error);
      return false;
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
      localStorage.removeItem("email");
    }
  };

  const resetStore = () => {
    uid.value = null;
    token.value = null;
    expiresIn.value = null;
  };

  return {
    uid,
    token,
    expiresIn,
    access,
    isAdmin,
    refreshToken,
    logout,
  };
});
