<template>
  <div class="home">
    <Navbar />
    <div class="body">
      <div class="navbar-spacing"></div>
      <div class="main-content">
        <h1>Profile Section</h1>
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
    return {};
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
}
</style>
