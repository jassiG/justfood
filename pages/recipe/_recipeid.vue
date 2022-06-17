<template>
  <div class="recipe">
    <Navbar />
    <Loading v-if="$fetchState.pending" />
    <div v-else class="content-block">
      <div class="top-image">
        <img :src="this.dish.dishImage.url" alt="dish image" />
      </div>
      <div class="title">{{ this.dish.subject }}</div>
      <div class="description">{{ this.dish.description }}</div>
      <div class="tags">
        <div class="tag" v-for="tag in this.dish.tag">{{ tag }}</div>
        <div class="tag" v-for="tag in this.dish.aditionalTags">{{ tag }}</div>
      </div>
      <!-- <hr> -->
      <Heading title="Ingredients" />
      <!-- Replace with real ingredients once done -->
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
  </div>
</template>
<script>
import NavBar from "~~/components/Navbar.vue";
import Loading from "~~/components/Loading.vue";
import axios from "axios";
// import md from '@nuxtjs/markdownit'
export default {
  name: "Recipe",
  components: { NavBar },
  data() {
    return {
      dish: {},
      tags: [],
    };
  },
  async fetch() {
    // this.dishId = this.$route.params.recipeid
    await this.getDish();
    return;
  },
  fetchDelay: 500,
  methods: {
    async getDish() {
      try {
        // REMOVE THIS LINE POSITIVELY WHEN DONE!!
        if (!process.env.BASE_URL) {
          process.env.BASE_URL =
            "https://sample-jassi.g.kuroco.app/rcms-api/5/";
        }
        const response = await axios.get(
          process.env.BASE_URL + "get-dish/" + this.$route.params.recipeid
        );
        this.dish = response.data.details;
        // REMOVE THIS LINE POSITIVELY WHEN DONE!!
        // this.dish.dishImage.url = 'https://via.placeholder.com/450'
        this.tags = this.dish.tag;
        // this.mainContent = await md.render(this.dish.mainContent)
        // console.log("Dish\n", this.dish)
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
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #302939;
}
.recipe {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 700px;
  .content-block {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: center;
    // background-color: antiquewhite;
    width: 55%;
    min-width: 650px;
    padding: 0px 50px;
    // box-shadow: 0px 0px 4px rgb(175, 175, 175, 0.25);
    clip-path: inset(0px -20px 0px -20px);
    // @media (min-width: 500px) {
    //     width: 90%;
    //     padding: 0px 10px;
    // }
    // @media (min-width: 1000px) {
    //     width: 60%;
    // }
    .top-image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 500px;
      margin-top: 40px;
      // background-color: rgb(215, 255, 255);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;
        // background-color: beige;
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
      // background-color: #302939;
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
          // border: #d8ffff 2px solid;
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
        // padding: 6px;
        text-align: center;
        margin: 6px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px rgb(175, 175, 175, 0.2);
        // border: 2px solid #bcb8c0;
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
      // background-color: #d8ffff;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      width: 100%;
      // background-color: rgb(215, 255, 222);
      // padding: 20px;
      // white-space:pre-wrap;
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
