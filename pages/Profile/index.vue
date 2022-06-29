<template>
  <div class="home">
    <Navbar />
    <div class="body">
      <div class="navbar-spacing"></div>
      <div class="main-content">
        <h1>Profile Section</h1>
        <div class="info">
          <div v-for="(val, key) in profile" :key="key" class="info-field">
            <div class="info-title">{{ key }}</div>
            <div class="seperator">:</div>
            <div v-if="typeof val === 'object'" class="obj">
              <div v-for="v of val" class="info-value">{{ v }}</div>
            </div>
            <div v-else class="info-value">{{ val }}</div>
          </div>
        </div>
        <div class="button" @click="logout">Logout</div>
      </div>
      <div class="footer-spacing"></div>
      <Footer />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  middleware: "auth",
  name: "Profile",
  data() {
    return {
      profile: {},
    };
  },
  fetch() {
    this.profile = this.$store.state.profile;
    // console.log("profile:", this.profile);
    return;
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poor+Story&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.body {
  min-height: 100vh;
}
.big {
  font-family: "Poor Story", cursive;
  font-size: 48px;
  max-width: 200px;
  padding: 1000px 10px;
  background-color: beige;
}
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  color: #302939;
  font-family: "Poppins", sans-serif;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .info-field {
      display: flex;
      flex-direction: row;
      // justify-content: center;
      width: 400px;
      // div {
      //   margin: 4px 4px;
      // }
      .info-title {
        font-family: "Poppins", sans-serif;
        font-size: 1em;
        width: 50%;
        font-weight: bold;
        text-align: right;
        margin: 4px 4px;
      }
      .seperator {
        margin: 4px;
      }
      .info-value {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 50%;
        font-family: "Poppins", sans-serif;
        margin: 4px 4px;
        font-size: 1em;
        .obj {
          // width: 100%;
          margin: 0px;
          flex-grow: 1;
          .info-value {
            // width: 100%;
          }
        }
      }
    }
  }
}
</style>
