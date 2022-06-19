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
  </form>
</template>

<script>
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
      // Dummy request(Succeed/fail after 1 sec.)
      const shouldSuccess = true;
      const request = new Promise((resolve, reject) =>
        setTimeout(
          () => (shouldSuccess ? resolve() : reject(Error("login failure"))),
          1000
        )
      );

      try {
        await request;
        this.$store.commit("setProfile", { profile: {} });
        this.loginStatus = "success";
        this.resultMessage = "Login successful";
      } catch (e) {
        this.loginStatus = "failure";
        this.resultMessage = "Login failed";
      }
    },
  },
};
</script>
