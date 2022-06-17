<template>
  <div>
    <!-- navbar -->
    <div class="home">
      <Navbar />
      <!-- Search -->
      <div class="filters">
        <div class="icon">
          <svg
            id="i-lightning"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            width="24px"
            height="24px"
          >
            <path d="M18 13 L26 2 8 13 14 19 6 30 24 19 Z" />
          </svg>
        </div>
        <div class="filter-text">Quick Search</div>
        <div class="chips">
          <div class="chip" :style="toggleStyle(isEasyMode)" @click="easyMode">
            Beginner Friendly
          </div>
          <div class="chip" :style="toggleStyle(isHardMode)" @click="hardMode">
            Pro Mode
          </div>
        </div>
      </div>
      <div class="search">
        <input
          @keyup.escape="reset"
          @keyup.enter="search2(searchInput)"
          type="text"
          placeholder="Search Dishes"
          v-model.lazy="searchInput"
        />
      </div>
      <Heading title="Today's Top Picks" />
      <TopPicks :topDishes="this.topDishes" />
      <Heading title="Explore" />
      <Explore :dishes="this.dishes" searchInput="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "~~/components/Navbar.vue";
import Heading from "~~/components/Heading.vue";
import Explore from "~~/components/Explore.vue";
export default {
  name: "Home",
  components: { Navbar, Heading, Explore },
  data() {
    return {
      dishes: [],
      topDishes: [],
      searchInput: "",
      searchResult: {},
      isEasyMode: false,
      isHardMode: false,
    };
  },
  async fetch() {
    await this.getDishes();
  },
  fetchDelay: 500,
  methods: {
    async getDishes() {
      try {
        // REMOVE THIS LINE POSITIVELY WHEN DONE!!
        if (!process.env.BASE_URL) {
          process.env.BASE_URL =
            "https://sample-jassi.g.kuroco.app/rcms-api/5/";
        }
        const response = await axios.get(process.env.BASE_URL + "all-dishes");
        if (!this.dishes) {
          this.dishes = [];
        }
        if (!this.topDishes) {
          this.topDishes = [];
        }
        this.dishes = response.data.list;
        this.dishes.forEach((dish, index) => {
          if (dish.isTop[0].key === "1") {
            this.topDishes.push(dish);
            this.dishes.slice(index, 1);
          }
        });
      } catch (e) {
        console.log(e.message);
      }
      return;
    },
    toggleStyle(toggle) {
      if (toggle) {
        return "background-color:#ffb1c1; border:1px solid #DEFCFC;";
      } else {
        return "background-color:#FFE6EB;";
      }
    },
    async search() {
      this.searchInput = this.searchInput.toLowerCase();
    },
    async search2(query) {
      this.isEasyMode = false;
      this.isHardMode = false;
      // REMOVE THIS LINE POSITIVELY WHEN DONE!!
      if (!process.env.BASE_URL) {
        process.env.BASE_URL = "https://sample-jassi.g.kuroco.app/rcms-api/5/";
      }
      this.$axios
        .get(process.env.BASE_URL + "search", {
          params: {
            filter: this.buildFilterQuery(query),
          },
        })
        .then((response) => {
          this.dishes = response.data.list || {};
        })
        .catch(({ response }) => {
          this.searchResult =
            !(response instanceof Object) ||
            !Array.isArray(response.data.errors)
              ? { errors: ["Unexpected error"] }
              : response.data;
        });
    },
    // Generate filter query
    buildFilterQuery(query) {
      return `title icontains "${query}" OR 
                    description icontains "${query}" OR
                    aditionalTags icontains "${query}" OR
                    tag icontains "${query}"`;
    },
    async easyMode() {
      this.isEasyMode = !this.isEasyMode;
      this.isHardMode = false;
      if (this.isEasyMode) {
        this.search2("easy");
        this.isEasyMode = true;
      } else {
        this.reset();
      }
    },
    async hardMode() {
      this.isHardMode = !this.isHardMode;
      this.isEasyMode = false;
      if (this.isHardMode) {
        this.search2("hard");
        this.isHardMode = true;
      } else {
        this.reset();
      }
    },
    async reset() {
      this.searchInput = "";
      try {
        // REMOVE THIS LINE POSITIVELY WHEN DONE!!
        if (!process.env.BASE_URL) {
          process.env.BASE_URL =
            "https://sample-jassi.g.kuroco.app/rcms-api/5/";
        }
        const response = await axios.get(process.env.BASE_URL + "all-dishes");
        if (!this.dishes) {
          this.dishes = [];
        }
        if (!this.topDishes) {
          this.topDishes = [];
        }
        this.dishes = response.data.list;
      } catch (e) {
        console.log(e.message);
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
  flex: none;
  order: 0;
  flex-grow: 0;
}
a {
  text-decoration: none;
  color: #302939;
}
.search {
  position: absolute;
  top: 70px;
  right: 10px;
  display: flex;
  width: 25%;
  max-width: 350px;
  flex-direction: row;
  justify-content: flex-start;

  box-shadow: 0px 0px 8px rgba(170, 170, 170, 0.2);
  input {
    padding: 12px 6px;
    font-size: 14px;
    border: none;
    &:focus {
      outline: #d8ffffb9 solid 2px;
    }
    flex-grow: 3;
  }
  .button {
    padding: 0px 4px;
    border: 1px solid #ffffff;
    background-color: #ffd8d8;
  }
}
.filters {
  position: absolute;
  top: 70px;
  left: 10px;
  display: flex;
  align-items: center;
  .icon {
    margin-top: 4px;
  }
  .filter-text {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #302939;
    text-align: center;
  }
  .chips {
    display: flex;
    flex-direction: row;
    margin: 0px 6px;
    .chip {
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      padding: 2px 4px;
      font-weight: 300;
      color: #302939;
      text-align: center;
      background-color: $primary-color;
      border-radius: 8px;
      margin: 2px 2px;
      &:hover {
        box-shadow: #d8ffff 0px 0px 6px;
      }
    }
  }
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  min-width: 700px;
  position: relative;
}
</style>
