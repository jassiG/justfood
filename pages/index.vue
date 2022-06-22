<template>
  <div clas="main">
    <!-- navbar -->
    <div class="home">
      <Navbar />
      <Loading v-if="$fetchState.pending" />
      <div v-else class="body">
        <div class="navbar-spacing"></div>
        <!-- Filters -->
        <!-- <div class="filters">
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
      </div> -->
        <!-- Search -->
        <div class="search">
          <input
            @keyup.escape="reset"
            @keyup.enter="setSearch()"
            type="text"
            placeholder="Search Dishes"
            v-model.lazy="searchInput"
          />
        </div>
        <Heading title="Today's Top Picks" />
        <TopPicks :topDishes="this.topDishes" />
        <Heading title="Explore" />
        <div class="categories">
          <div class="category" @click="setCategory('all')">All</div>
          <div class="category" @click="setCategory('indian')">Indian</div>
          <div class="category" @click="setCategory('english')">English</div>
          <div class="category" @click="setCategory('japanese')">Japanese</div>
        </div>
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
          <div class="sad-text">No results found</div>
        </div>
        <Explore v-else :dishes="this.dishes" />
        <div class="page-navigator">
          <span class="button" @click="changePage(currentPage - 1)">
            <svg
              viewBox="0 0 24 24"
              xml:space="preserve"
              width="20px"
              height="20px"
            >
              <polyline
                fill="none"
                points="17.5,3 8.5,12 17.5,21 "
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="2"
              />
            </svg>
          </span>
          <div class="pages">
            <div
              v-for="i in totalPages"
              class="page"
              :style="isSelectedPage(i)"
              @click="changePage(i)"
            >
              {{ i }}
            </div>
          </div>
          <span class="button" @click="changePage(currentPage + 1)">
            <svg
              viewBox="0 0 24 24"
              xml:space="preserve"
              width="20px"
              height="20px"
            >
              <polyline
                fill="none"
                points="8.5,3 17.5,12 8.5,21 "
                stroke="#000000"
                stroke-miterlimit="10"
                stroke-width="2"
              />
            </svg>
          </span>
        </div>
        <div class="footer-spacing"></div>
        <Footer />
      </div>
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
  // middleware: "auth",
  data() {
    return {
      dishes: [],
      topDishes: [],
      searchResult: {},
      isEasyMode: false,
      isHardMode: false,
      currentPage: 1,
      totalPages: 1,
      searchInput: "",
      category: "",
    };
  },
  async fetch() {
    await this.getDishes();
    return;
  },
  fetchDelay: 500,
  methods: {
    async getDishes() {
      console.log("getDishes called");
      if (this.category === "") {
        await this.getAllDishes();
        this.topDishes = await this.getDishesByCategory("top");
      } else {
        this.dishes = await this.getDishesByCategory();
        this.topDishes = await this.getDishesByCategory("top");
      }
    },
    async getAllDishes() {
      console.log("getAllDishes called");
      try {
        const response = await axios.get(process.env.BASE_URL + "all-dishes", {
          params: {
            // filter by keyword is not working in kuroco, doing it the simple way
            filter: `title icontains "${this.searchInput}" OR
                    description icontains "${this.searchInput}" OR
                    aditionalTags icontains "${this.searchInput}"`,
            pageID: this.currentPage,
          },
        });
        if (!this.dishes) {
          this.dishes = [];
        }
        this.dishes = response.data.list;
        this.totalPages = response.data.pageInfo.totalPageCnt;
      } catch (e) {
        console.log(e.message);
      }
      return;
    },

    async getDishesByCategory(category = this.category) {
      console.log("getDishesByCategory called for category: " + category);
      // Get dishes Ids
      this.currentPage = 1;
      let response;
      if (category === "top") {
        const dishResponse = await axios.get(
          process.env.BASE_URL + `get-${category}`,
          {
            params: {
              pageID: 1,
            },
          }
        );
        response = dishResponse.data.list;
        let dishList = [];
        response.forEach((dishId, index) => {
          dishList.push(dishId.ext_1.module_id);
        });
        if (dishList.length === 0) {
          return [];
        }
        // Get dishes data
        const finalList = await axios.get(process.env.BASE_URL + "all-dishes", {
          params: {
            id: dishList,
            pageID: 1,
          },
        });
        return finalList.data.list;
      } else {
        const dishResponse = await axios.get(
          process.env.BASE_URL + `get-${category}`,
          {
            params: {
              pageID: this.currentPage,
            },
          }
        );
        response = dishResponse.data.list;
        let dishList = [];
        response.forEach((dishId, index) => {
          dishList.push(dishId.ext_1.module_id);
        });

        console.log("dishList is: ", dishList);
        // Get dishes data
        const finalList = await this.getDishesFromId(dishList);
        console.log("FinalList is: ", finalList);
        return finalList;
      }
    },
    async getDishesFromId(idList = []) {
      if (idList.length === 0) {
        console.log("idList is empty");
        this.totalPages = 0;
        return [];
      }
      const response = await axios.get(process.env.BASE_URL + "all-dishes", {
        params: {
          id: idList,
          filter: `title icontains "${this.searchInput}" OR description icontains "${this.searchInput}" OR aditionalTags icontains "${this.searchInput}"`,
          pageID: this.currentPage,
        },
      });
      this.totalPages = response.data.pageInfo.totalPageCnt;
      return response.data.list;
    },

    // Helper Functions
    async setCategory(category) {
      console.log("setCategory called");
      if (category === "all") {
        this.category = "";
      } else {
        this.category = category;
        console.log("category is now " + this.category);
      }
      await this.reset();
    },
    async setSearch() {
      console.log("setSearch called");
      this.changePage(1);
      // this.getDishes();
    },
    async reset() {
      console.log("reset called");
      this.searchInput = "";
      this.changePage(1);
      return;
    },
    toggleStyle(toggle) {
      if (toggle) {
        return "background-color:#ffb1c1; border:1px solid #DEFCFC;";
      } else {
        return "background-color:#FFE6EB;";
      }
    },

    async easyMode() {
      this.isEasyMode = !this.isEasyMode;
      this.isHardMode = false;
      if (this.isEasyMode) {
        // this.searchByTags("easy");
        this.isEasyMode = true;
      } else {
        this.reset();
      }
    },
    async hardMode() {
      this.isHardMode = !this.isHardMode;
      this.isEasyMode = false;
      if (this.isHardMode) {
        // this.searchByTags("hard");
        this.isHardMode = true;
      } else {
        this.reset();
      }
    },
    async changePage(page) {
      console.log("changePage called");
      page = page < 1 ? 1 : page;
      page = page > this.totalPages ? this.totalPages : page;
      this.currentPage = page;
      this.getDishes();
    },
    isSelectedPage(page) {
      if (page === this.currentPage) {
        return "background-color: #ffe6eb;";
      } else {
        return "background-color: #FFFFFF;";
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
  flex: none;
  order: 0;
  flex-grow: 0;
}
.main {
  position: relative;
  height: 100%;
}
a {
  text-decoration: none;
  color: #302939;
}
.navbar-spacing {
  height: 50px;
}
.footer-spacing {
  height: 150px;
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
.categories {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .category {
    padding: 2px 6px;
    background-color: #ffd8d8;
    border-radius: 100vmax;
    margin: 4px;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #ffe6eb;
    }
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
      cursor: default;
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
.sad {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sad-text {
    color: #4f4f4f;
    font-size: 1.8em;
    font-weight: bold;
  }
  svg {
    margin-top: 30px;
    margin-bottom: 10px;
    width: 200px;
    height: auto;
    .cls-1 {
      fill: #ffe082;
      stroke: #ffe082;
    }
    .cls-1,
    .cls-2,
    .cls-3,
    .cls-5,
    .cls-6 {
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2px;
    }
    .cls-2 {
      fill: #5b3b63;
      stroke: #5b3b63;
      opacity: 0.05;
    }
    .cls-3,
    .cls-6 {
      fill: none;
    }
    .cls-3,
    .cls-5 {
      stroke: #ffb74d;
    }
    .cls-4 {
      fill: #4f4f4f;
    }
    .cls-5 {
      fill: #ffb74d;
    }
    .cls-6 {
      stroke: #f57e17;
    }
  }
}
.page-navigator {
  display: flex;
  flex-direction: row;
  margin: 10px;
  .pages {
    display: flex;
    flex-direction: row;
    margin: 0px 6px;
    .page {
      // font-family: "Poppins", sans-serif;
      font-size: 14px;
      padding: 2px 4px;
      font-weight: bold;
      color: #302939;
      text-align: center;
      border-radius: 6px;
      margin-inline: 4px;
      font-variant-numeric: tabular-nums;
      cursor: default;
    }
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 4px;
    margin-inline: 4px;
    // border: 1px solid #ffffff;
    // background-color: $secondary-color;
    font-weight: bold;
    border-radius: 4px;
    &:hover {
      background-color: #ffd8d880;
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
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 100%;
  min-width: 700px;
  position: relative;
  flex-grow: 1;
}
</style>
