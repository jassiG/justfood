<template>
  <div class="body login">
    <form v-if="!signupDone" @submit.prevent="signup">
      <div class="form-container-signup">
        <div class="form-title">JustFood</div>
        <div class="input column">
          <div class="input row">
            <input
              v-model="user.name1"
              name="name1"
              type="text"
              placeholder="family name"
            />
            <input
              v-model="user.name2"
              name="name2"
              type="text"
              placeholder="name"
            />
          </div>
          <input
            v-model="user.email"
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            v-model="user.login_pwd"
            name="login_pwd"
            type="password"
            placeholder="password (8+ characters with numbers)"
          />
          <input
            v-model="login_pwd_confirm"
            name="login_pwd"
            type="password"
            placeholder="confirm password"
          />
          <button type="submit" class="button">Sign up</button>
          <!-- <Heading title="or" /> -->
          <div class="bottom-text">
            Already have an account?
            <NuxtLink to="/login" class="nuxt-link">Login</NuxtLink>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
        </div>
      </div>
    </form>
    <div v-if="signupDone" class="done">
      <div class="text">New member registration is complete.</div>
      <NuxtLink to="/login" class="button">Go Back to Login</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  //   middleware: "auth",
  data() {
    return {
      signupDone: true,

      user: {
        name1: "",
        name2: "",
        email: "",
        login_pwd: "",
      },
      login_pwd_confirm: "",
      error: null,
    };
  },
  methods: {
    async signup() {
      if (this.user.login_pwd.length < 8) {
        this.error =
          "Password must be at least 8 characters with letters and numbers.";
        return;
      } else if (this.user.login_pwd !== this.login_pwd_confirm) {
        this.error = "Password and Confirm Passwords do not match";
        return;
      }
      try {
        // Get AnonymousToken
        const tokenRes = await this.$axios.$post(
          process.env.BASE_URL + "auth/token",
          {} // For AnonymousUser token value acquisition requests, specify an empty object in the request body.
        );
        const anonymousToken = tokenRes.access_token.value;

        // Create a custom header containing AnonymousToken.
        const customHeaderConfig = {
          headers: {
            "X-RCMS-API-ACCESS-TOKEN": anonymousToken,
          },
        };

        // Send new member registration request.
        await this.$axios
          .$post(
            process.env.BASE_URL + "member/register",
            { ...this.user }, // Use the form content as the request body
            customHeaderConfig
          )
          .then((response) => {
            this.signupDone = true;
            return response;
          })
          .catch((err) => {
            this.error = err.response.data.errors[0].message;
            console.log(this.error);
          });
      } catch (e) {
        console.error(e);
        // this.error = "something went wrong";
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
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/login.png");
  background-size: fit;
  background-repeat: no-repeat;
}
.done {
  background-color: $primary-color;
  // padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1em;
  color: #302939;
  font-family: "Poppins", sans-serif;
  .text {
    margin-inline: 15px;
    margin-top: 10px;
  }
  .button {
    margin: 15px;
  }
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.form-container-signup {
  display: flex;
  flex-direction: column;
  align-items: center;
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
    // max-width: 300px;
    padding: 0.25rem;
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
    // min-width: 270px;
    gap: 10px;
    input {
      min-height: 25px;
      // min-width: 250px;
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
  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    input {
      // max-width: 150px;
    }
  }
  .error {
    font-size: 0.7em;
    color: red;
    text-align: center;
    width: 100%;
    margin-top: -10px;
    margin-bottom: -5px;
    margin-right: -5px;
    margin-left: -5px;
    text-align: center;
  }
}
</style>
