<template>
  <div class="body login">
    <form @submit.prevent="login">
      <div class="form-container">
        <div class="form-title">JustFood</div>
        <div class="input column">
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
          <!-- <Heading title="or" /> -->
          <div class="bottom-text">
            Don't have an account? Why not
            <NuxtLink to="/signup" class="nuxt-link">Sign Up?</NuxtLink>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
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
@import url("https://fonts.googleapis.com/css2?family=Poor+Story&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.body {
  min-height: 100vh;
  position: relative;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/login.png");
  background-size: fit;
  background-repeat: no-repeat;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 290px;
  margin: 30px auto;
  padding-inline: 2em;
  border-radius: 1em;
  background-color: $primary-color;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  .heading {
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 0px;
  }
  input {
    border: none;
    flex-grow: 1;
    max-width: 300px;
    padding: 0.25rem;
    min-width: 270px;
    // margin: 4px;
    background-color: #fff4f5;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }
  .form-title {
    width: 100%;
    font-size: 3em;
    font-family: "Poor Story", cursive;
    font-weight: bold;
    color: #302939;
    margin-top: 0.5em;
    // margin-bottom: 0.5em;
    text-align: center;
  }
  .input {
    margin-bottom: 10px;
    margin-top: 5px;
    min-width: 270px;
    gap: 10px;
    input {
      min-height: 25px;
      min-width: 300px;
      margin-top: 1em;
      // margin-inline: 4px;
      // max-width: 120px;
    }
    button {
      min-width: 100px;
      padding: 10px;
      margin: 1em;
      margin-bottom: 0.5em;
    }
    .nuxt-link {
      color: #275063;
      font-weight: bold;
    }
    .bottom-text {
      font-size: 0.8em;
      margin-bottom: 0.3em;
      text-align: center;
    }
  }
  .column {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
