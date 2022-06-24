<template>
  <form @submit.prevent="login">
    <input v-model="email" name="email" type="email" placeholder="email" />
    <input
      v-model="password"
      name="password"
      type="password"
      placeholder="password"
    />
    <button type="submit">Login</button>
    <div><nuxt-link to="/About">About</nuxt-link></div>
    <button type="button" @click="logout">Logout</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  //   middleware: "auth",
  data() {
    return {
      email: "",
      password: "",

      loginStatus: null,
      resultMessage: null,
    };
  },
  computed: {
    resultMessageColor() {
      switch (this.loginStatus) {
        case "success":
          return "green";
        case "failure":
          return "red";
        default:
          return "";
      }
    },
  },
  methods: {
    async login() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("login", payload, {
          // headers: {
          //   "Access-Control-Allow-Origin": "*",
          // },
        });
        this.loginStatus = "success";
        this.resultMessage = "Login successful";
      } catch (e) {
        this.loginStatus = "failure";
        this.resultMessage = "Login failed";
      }
    },
    ...mapActions(["logout"]),
  },
};
</script>
