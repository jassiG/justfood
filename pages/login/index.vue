<template>
  <div class="body">
    <form @submit.prevent="login">
      <div class="form-container">
        <div class="form-title">Login Section</div>
        <div class="input-column">
          <input
            v-model="email"
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            v-model="password"
            name="password"
            type="password"
            placeholder="password"
          />
          <button type="submit" class="button">Login</button>
        </div>
      </div>
    </form>
  </div>
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
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("login", payload, {});
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
<style lang="scss">
.body {
  min-height: 100vh;
  position: relative;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px;
  margin: 30px auto;
  padding-inline: 2.5em;
  border-radius: 1em;
  background-color: $primary-color;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  input {
    border: none;
    flex-grow: 1;
    max-width: 300px;
    padding: 0.25rem;
    // margin: 4px;
    background-color: #fff4f5;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }
  .form-title {
    width: 100%;
    font-size: 2em;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: #302939;
    margin-top: 1em;
    margin-bottom: 0.5em;
    text-align: center;
  }
  .input-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 5px;
    gap: 10px;
    input {
      min-height: 25px;
      min-width: 250px;
      margin-top: 1em;
      // margin-inline: 4px;
      // max-width: 120px;
    }
    button {
      width: 80px;
      padding: 10px;
      margin: 1em;
    }
  }
}
</style>
