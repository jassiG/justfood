<template>
  <div class="home">
    <div class="body">
      <div class="navbar-spacing"></div>
      <div class="main-content">
        <div class="form-container">
          <div class="form-title">Login Section</div>
          <form @submit.prevent="login">
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
          </form>
        </div>
      </div>
    </div>
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
input {
  border: none;
  flex-grow: 1;
  max-width: 300px;
  padding: 0.25rem;
  // margin: 4px;
  background-color: #fff4f5;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 650px;
  margin: 30px auto;
  padding: 1em 3.5em;
  border-radius: 1em;
  background-color: $primary-color;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  h1 {
    text-align: center;
  }
  .form-title {
    width: 100%;
    font-size: 2em;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: #302939;
    margin-top: 0.5em;
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
      min-height: 20px;
      min-width: 160px;
      // margin-inline: 4px;
      // max-width: 120px;
    }
    button {
      width: 80px;
      padding: 10px;
    }
  }
}
</style>
