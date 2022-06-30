<template>
  <div class="recipe">
    <client-only>
      <Navbar />
    </client-only>
    <Loading v-if="$fetchState.pending" />
    <div v-else class="content-block">
      <div class="top-image">
        <img :src="this.dish.dishImage.url" alt="dish image" />
        <div v-if="!guestMode" class="love">
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 426.667 426.667"
            xml:space="preserve"
            @click="changeFav"
          >
            <polygon
              :style="favStyle()"
              points="213.333,10.441 279.249,144.017 426.667,165.436 320,269.41 345.173,416.226 213.333,346.91 81.485,416.226 106.667,269.41 0,165.436 147.409,144.017 "
              id="id_101"
            ></polygon>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
      </div>
      <div class="title">{{ this.dish.subject }}</div>
      <div class="description">{{ this.dish.description }}</div>
      <div class="tags">
        <div class="tag">{{ this.dish.timeInMinutes + " Minutes" }}</div>
        <div class="tag">{{ this.dish.difficulty.label + " Difficulty" }}</div>
        <div class="tag" v-for="tag in this.dish.aditionalTags">{{ tag }}</div>
      </div>
      <Heading title="Ingredients" />
      <div class="ingredients">
        <div
          class="ingredient"
          v-for="(ingredient, index) in this.dish.ingredient"
        >
          <div class="ingredient-name">{{ ingredient.ingredient }}</div>
          <div class="ingredient-amount">{{ ingredient.amount }}</div>
        </div>
      </div>
      <Heading title="Instructions" />
      <div class="main-content" v-html="this.dish.mainContent"></div>
    </div>
    <div class="footer-spacing"></div>
    <Footer />
  </div>
</template>
<script>
import NavBar from "~~/components/Navbar.vue";
import Loading from "~~/components/Loading.vue";
import axios from "axios";
export default {
  name: "Recipe",
  components: { NavBar },
  data() {
    return {
      dish: {},
      tags: [],
      isFav: false,
      guestMode: true,
      halt: false,
    };
  },
  async mounted() {
    console.log("checking for profile in mounted in _recipe");
    if (localStorage.getItem("profile")) {
      this.guestMode = false;
      // console.log(this.loggedIn);
    }
  },
  async fetch() {
    if (this.guestMode) {
      this.dish = await this.getDish();
    } else {
      [this.dish, this.isFav] = await Promise.all([
        this.getDish(),
        this.checkFav(),
      ]);
      console.log("Is this favorite: ", this.isFav);
    }
    return;
  },
  fetchDelay: 500,
  methods: {
    async getDish() {
      try {
        const response = await this.$axios.get(
          process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 3) +
            "/6/dish/" +
            this.$route.params.recipeid,
          {
            headers: {
              "Content-Type": "multipart/form-data", // required to post file as a binary
            },
          }
        );
        // console.log("dish:", this.dish);
        this.tags = this.dish.tag;
        return response.data.details;
      } catch (error) {
        console.log(error);
      }
      return;
    },
    async checkFav() {
      let dishId = Number(this.$route.params.recipeid);
      try {
        const response = await this.$axios.get(
          process.env.BASE_URL + "dish/user-favorite",
          {
            params: {
              id: dishId,
            },
          }
        );
        if (response.data.pageInfo.totalCnt > 0) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addFav(id) {
      this.halt = true;
      try {
        const response = await this.$axios.post(
          process.env.BASE_URL + "favorite/add",
          {
            module_type: "topics",
            module_id: Number(id),
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      this.halt = false;
      return;
    },
    async removeFav(id) {
      this.halt = true;
      try {
        const response = await this.$axios.post(
          process.env.BASE_URL + "favorite/remove",
          {
            module_type: "topics",
            module_id: Number(id),
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      this.halt = false;
      return;
    },
    favStyle() {
      if (this.isFav) {
        return "fill: #fac917; transform: rotate(144deg);";
      } else {
        return "fill: #fff;";
      }
    },
    async changeFav() {
      if (!this.halt) {
        // call api and await response
        if (this.isFav) {
          await this.removeFav(this.$route.params.recipeid);
        } else {
          await this.addFav(this.$route.params.recipeid);
        }
        this.isFav = !this.isFav;
        console.log("Fav changed");
      }
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poor+Story&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #302939;
}
.footer-spacing {
  height: 150px;
}
.recipe {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 700px;
  position: relative;
  .content-block {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    width: 55%;
    min-width: 650px;
    padding: 0px 50px;
    clip-path: inset(0px -20px 0px -20px);
    .top-image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 500px;
      margin-top: 60px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
      }
      .love {
        position: absolute;
        right: 4px;
        bottom: 4px;
        width: 40px;
        height: 40px;
        transition: all 0.2s ease-in-out;
        polygon {
          transition: 0.2s;
          -webkit-transform-origin: center center;
        }
      }
    }
    .title {
      width: 100%;
      font-size: 3em;
      font-family: "Poppins", sans-serif;
      font-weight: bold;
      color: #302939;
    }
    .description {
      width: 100%;
      font-size: 1.3em;
      color: #625f66;
      font-family: "Poppins", sans-serif;
      margin-bottom: 10px;
    }
    .tags {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0px 6px;
      .tag {
        font-family: "Poppins", sans-serif;
        font-size: 14px;
        padding: 2px 4px;
        font-weight: 300;
        color: #302939;
        text-align: center;
        background-color: $secondary-color;
        border-radius: 8px;
        margin-right: 10px;
        &:hover {
          box-shadow: #d8ffff 0px 0px 6px;
        }
      }
    }
    .ingredients {
      display: flex;
      text-align: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 95%;
      .ingredient {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        font-family: "Poppins", sans-serif;
        font-size: 1em;
        color: #302939;
        text-align: center;
        margin: 6px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px rgb(175, 175, 175, 0.2);
        line-height: 1em;
        .ingredient-name {
          background-color: $primary-color;
          padding: 2px 6px;
          border-radius: 4px 4px 0px 0px;
        }
        .ingredient-amount {
          font-size: 0.8em;
          color: #58535e;
          background-color: white;
          padding: 2px 6px;
          border-radius: 0px 0px 4px 4px;
        }
      }
    }
    .main-content {
      width: 100%;
      font-family: "Poppins", sans-serif;
      text-align: justify;
      color: #58535e;
      margin: 10px 0px;
      margin-bottom: 40px;
      line-height: 1.9em;
      h {
        margin-left: 0px;
      }
      p {
        margin-bottom: 5px;
        line-height: 1.8em;
      }
      li {
        margin-left: 20px;
      }
    }
  }
}
</style>
