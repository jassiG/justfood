<template>
  <div class="home">
    <Navbar />
    <div class="body">
      <div class="navbar-spacing"></div>
      <div class="main-content">
        <h1>Profile Section</h1>
        <div class="profile">
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
          <div class="profile-pic"></div>
        </div>
        <div class="button shrink" @click="logout">Logout</div>

        <div class="grad-secondary tile padding">Recent Favourites</div>
        <div v-if="totalPages === 0" class="sad">
          <svg viewBox="0 0 64 64">
            <title>sad</title>
            <path
              class="cls-1"
              d="M11,23V51.87A9.13,9.13,0,0,0,20.13,61h2.93A3.94,3.94,0,0,0,27,57.06V54H37v3.06A3.94,3.94,0,0,0,40.94,61h2.93A9.13,9.13,0,0,0,53,51.87V23A21,21,0,0,0,32,2h0A21,21,0,0,0,11,23Z"
              id="id_173"
              style="fill: rgb(255, 229, 232); stroke: rgb(255, 176, 189)"
            ></path>
            <path
              class="cls-2"
              d="M19,57.06a3.92,3.92,0,0,1-2,3.39,9.1,9.1,0,0,0,3.09.55h2.93A3.94,3.94,0,0,0,27,57.06V54H19Z"
              id="id_174"
            ></path>
            <path
              class="cls-2"
              d="M32,2a21.09,21.09,0,0,0-4,.39A21,21,0,0,1,45,23V51.87a9.13,9.13,0,0,1-6,8.58,3.9,3.9,0,0,0,2,.55h2.93A9.13,9.13,0,0,0,53,51.87V23A21,21,0,0,0,32,2Z"
              id="id_175"
            ></path>
            <line
              class="cls-3"
              x1="24"
              y1="54"
              x2="40"
              y2="54"
              id="id_176"
              style="stroke: rgb(235, 159, 176)"
            ></line>
            <circle class="cls-4" cx="20" cy="22" r="2" id="id_177"></circle>
            <circle class="cls-4" cx="44" cy="22" r="2" id="id_178"></circle>
            <path
              class="cls-5"
              d="M11,41v6a4,4,0,0,0,4,4h0a4,4,0,0,0,4-4V41Z"
              id="id_179"
              style="fill: rgb(255, 158, 174); stroke: rgb(240, 147, 162)"
            ></path>
            <path
              class="cls-5"
              d="M53,35v6a4,4,0,0,1-4,4h0a4,4,0,0,1-4-4V35Z"
              id="id_180"
              style="fill: rgb(255, 153, 170); stroke: rgb(240, 144, 160)"
            ></path>
            <path
              class="cls-6"
              d="M39,31.09C37.67,29.84,35,29,32,29a11.13,11.13,0,0,0-6.9,2"
              id="id_181"
              style="stroke: rgb(235, 103, 132)"
            ></path>
          </svg>
          <div class="sad-text">No Favourites</div>
        </div>
        <div v-for="dish of favs" class="grad-primary tile margin">
          {{ dish.title }}
        </div>
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
      favs: [],
      totalPages: 1,
      currentPage: 1,
    };
  },
  fetch() {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.getFavs();
    // console.log("profile:", JSON.parse(localStorage.getItem("profile")));
    return;
  },
  methods: {
    ...mapActions(["logout"]),
    async getFavs() {
      try {
        const response = await this.$axios.$get(
          process.env.BASE_URL + "dish/user-favorite",
          {
            params: {
              pageID: this.currentPage,
            },
          }
        );
        console.log("favs:", response.list);
        this.favs = response.list;
        this.totalPages = response.pageInfo.totalPageCnt;
      } catch (error) {
        console.log(error);
      }
      return;
    },
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
  justify-content: center;
  margin-top: 50px;
  width: 60%;
  color: #302939;
  font-family: "Poppins", sans-serif;
  h1 {
    font-size: 36px;
    text-align: center;
  }
  .shrink {
    width: fit-content;
  }
  .profile {
    width: 100%;
    display: flex;
    flex-direction: row;
    .profile-pic {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: #f5f5f5;
      margin: 4px;
    }
    .info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .info-field {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        // div {
        //   margin: 4px 4px;
        // }
        .info-title {
          font-family: "Poppins", sans-serif;
          font-size: 1em;
          font-weight: bold;
          margin: 4px 4px;
          padding: 2px;
        }
        .seperator {
          margin: 4px;
          margin-top: 5px;
        }
        .info-value {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          font-family: "Poppins", sans-serif;
          margin: 4px 4px;
          font-size: 1em;
          padding: 2px;
        }
        .obj {
          // width: 100%;
          margin: 0px;
          .info-value {
            border-radius: 4px;
            box-shadow: 0px 2px 6px rgba(82, 81, 81, 0.15);
            background-color: $primary-color;
            padding: 2px;
          }
        }
      }
    }
  }
}
</style>
