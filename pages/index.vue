<template>
  <!-- navbar -->
  <div class="home">
    <Navbar />
    <Loading v-if="$fetchState.pending" />
    <div v-else class="body">
      <div class="navbar-spacing"></div>
      <div class="shrink">
        <div class="row">
          <label v-if="cookTime > 180" for="points"
            >Max Recipe Time: 180+ minutes</label
          >
          <label v-else for="points"
            >Max Recipe Time: {{ cookTime }} minutes</label
          >
          <input
            v-model.lazy="cookTime"
            type="range"
            id="points"
            name="points"
            min="15"
            max="195"
            step="15"
            @change="getDishesWithoutTop"
          />
        </div>
        <div class="row">
          <label for="points"
            >Max Difficulty: {{ difficultyDict[difficulty] }}</label
          >
          <input
            v-model.lazy="difficulty"
            type="range"
            id="points"
            name="points"
            min="1"
            max="3"
            step="1"
            @change="getDishesWithoutTop"
          />
        </div>
      </div>
      <!-- Search -->
      <div class="search-field">
        <div class="search">
          <input
            @keyup.escape="reset"
            @keyup.enter="setSearch()"
            type="text"
            placeholder="Search Dishes"
            v-model.lazy="searchInput"
          />
        </div>
      </div>
      <Heading title="Today's Top Picks" />
      <TopPicks :topDishes="this.topDishes" />
      <Heading title="Explore" />
      <div class="categories">
        <div
          v-for="(id, cat) in category_dict"
          class="category"
          @click="setCategory(cat)"
          :style="getCategoryStyle(cat)"
        >
          {{ cat }}
        </div>
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
      <div v-else class="explore-body">
        <div class="sort"></div>
        <div class="sort"></div>
        <Explore :dishes="this.dishes" />
        <div class="sort">
          Sort By:
          <label
            ><input
              v-model="sortBy"
              type="radio"
              id="date"
              name="sortType"
              value="date"
              @change="setSort"
              checked
            />
            <span>Newest</span></label
          >
          <label
            ><input
              v-model="sortBy"
              type="radio"
              id="time"
              name="sortType"
              value="time"
              @change="setSort"
            />
            <span>Time</span></label
          >
          <label
            ><input
              v-model="sortBy"
              type="radio"
              id="name"
              name="sortType"
              value="name"
              @change="setSort"
            />
            <span>Name</span></label
          >
        </div>
        <div class="sort sort-narrow">
          Order:
          <label
            ><input
              v-model="sortOrder"
              type="radio"
              id="asc"
              name="sortOrder"
              value="ASC"
              @change="setSort"
            />
            <span>⬆️</span></label
          >
          <label
            ><input
              v-model="sortOrder"
              type="radio"
              id="desc"
              name="sortOrder"
              value="DESC"
              checked
              @change="setSort"
            />
            <span>⬇️</span></label
          >
        </div>
      </div>
      <div class="page-navigator">
        <span class="nav-button" @click="changePage(currentPage - 1)">
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
        <span class="nav-button" @click="changePage(currentPage + 1)">
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
</template>

<script>
import axios from "axios";
export default {
  // middleware: "auth",
  name: "Home",
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
      cookTime: 195,
      difficulty: 3,
      sortBy: "date",
      sortQuery: "",
      sortOrder: "DESC",
      difficultyDict: {
        1: "Easy",
        2: "Medium",
        3: "Hard",
      },
      // used for tags / categories
      category_dict: {
        all: 0,
        indian: 26,
        japanese: 27,
        english: 28,
        french: 29,
        mexican: 34,
      },
    };
  },
  async mounted() {
    await this.getDishes();
    return;
  },
  async fetch() {
    return;
  },
  // async mounted() {
  //   await this.getDishes();
  // },
  // fetchDelay: 500,
  methods: {
    async getDishes() {
      // console.log("getDishes");
      if (this.category === "") {
        let lol;
        [lol, this.topDishes] = await Promise.all([
          this.getAllDishes(),
          this.getDishesByCategory("top"),
        ]);
      } else {
        [this.dishes, this.topDishes] = await Promise.all([
          this.getDishesByCategory(),
          this.getDishesByCategory("top"),
        ]);
      }
    },
    async getDishesWithoutTop() {
      // console.log("getDishesWithoutTop called");
      if (this.category === "") {
        await this.getAllDishes();
      } else {
        this.dishes = await this.getDishesByCategory();
      }
    },
    async getAllDishes() {
      // console.log("getAllDishes called");
      try {
        let tempQuery = "";
        if (this.searchInput !== "") {
          tempQuery = `title icontains "${this.searchInput}" OR
                    description icontains "${this.searchInput}" OR
                    aditionalTags icontains "${this.searchInput}" AND `;
        }
        this.cookTime > 180
          ? (tempQuery += "")
          : (tempQuery += `timeInMinutes <= ${this.cookTime} AND `);

        const response = await axios.get(
          process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 3) +
            "/6/dish",
          {
            params: {
              // filter by keyword is not working in kuroco, doing it the simple way
              filter: `${tempQuery}difficulty <= "${this.difficulty}"`,
              pageID: this.currentPage,
              order_query: this.sortQuery,
            },
          }
        );
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
      // console.log("getDishesByCategory called for category: " + category);
      // Get dishes Ids
      this.currentPage = 1;
      let response;
      if (category === "top") {
        // console.log("top is called");
        // Get dishes data
        const finalList = await axios.get(
          process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 3) +
            "/6/dish",
          {
            params: {
              tag_id: [4],
              pageID: 1,
            },
          }
        );
        return finalList.data.list;
      } else {
        try {
          let tempQuery = "";
          if (this.searchInput !== "") {
            tempQuery = `(title icontains "${this.searchInput}" OR
                    description icontains "${this.searchInput}" OR
                    aditionalTags icontains "${this.searchInput}") AND `;
          }
          this.cookTime > 180
            ? (tempQuery += "")
            : (tempQuery += `timeInMinutes <= ${this.cookTime} AND `);
          const response = await axios.get(
            process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 3) +
              "/6/dish",
            {
              params: {
                // filter by keyword is not working in kuroco, doing it the simple way
                filter: `${tempQuery}
                    contents_type = ${[
                      this.category_dict[category],
                    ]} AND difficulty <= "${this.difficulty}"`,
                pageID: this.currentPage,
                order_query: this.sortQuery,
              },
            }
          );
          this.totalPages = response.data.pageInfo.totalPageCnt;
          return response.data.list;
        } catch (e) {
          console.log(e.message);
        }
        return;
      }
    },
    async getDishesFromId(idList = []) {
      if (idList.length === 0) {
        // console.log("idList is empty");
        this.totalPages = 0;
        return [];
      }
      let tempQuery = "";
      if (this.searchInput !== "") {
        tempQuery = `title icontains "${this.searchInput}" OR
                description icontains "${this.searchInput}" OR
                aditionalTags icontains "${this.searchInput}" AND `;
      }
      this.cookTime > 180
        ? (tempQuery += "")
        : (tempQuery += `timeInMinutes <= ${this.cookTime} AND `);
      const response = await axios.get(
        process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 3) +
          "/6/dish",
        {
          params: {
            id: idList,
            filter: `${tempQuery}difficulty <= "${this.difficulty}"`,
            pageID: this.currentPage,
          },
        }
      );
      this.totalPages = response.data.pageInfo.totalPageCnt;
      return response.data.list;
    },
    async setSort() {
      console.log("setsort called");
      switch (this.sortBy) {
        case "time":
          this.sortQuery = "timeInMinutes=" + this.sortOrder;
          break;
        case "date":
          this.sortQuery = "ymd=" + this.sortOrder;
          break;
        case "name":
          this.sortQuery = "subject=" + this.sortOrder;
          break;
        default:
          this.sortQuery = "";
          break;
      }
      await this.getDishesWithoutTop();
      return;
    },
    // Helper Functions
    async setCategory(category) {
      // console.log("setCategory called");
      if (category === "all") {
        this.category = "";
      } else {
        this.category = category;
        // console.log("category is now " + this.category);
      }
      await this.reset();
    },
    getCategoryStyle(category) {
      if (category === "all" && this.category === "") {
        return "transform: translate(0px, -3px); box-shadow: 0px 0px 6px rgba(0,0,0,0.15); background-color: #defcfc;";
      } else if (category === this.category) {
        return "transform: translate(0px, -3px); box-shadow: 0px 0px 6px rgba(0,0,0,0.15); background-color: #defcfc;";
      } else {
        return "";
      }
    },
    async setSearch() {
      // console.log("setSearch called");
      this.currentPage = 1;
      this.getDishesWithoutTop();
    },
    async reset() {
      // console.log("reset called");
      this.searchInput = "";
      this.currentPage = 1;
      this.getDishesWithoutTop();
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
      // console.log(
      //   "changePage called for page: " + page,
      //   "currentPage: ",
      //   this.currentPage
      // );
      let limit = false;
      if (page < 1 || page > this.totalPages) {
        limit = true;
      }
      page = page < 1 ? 1 : page;
      page = page > this.totalPages ? this.totalPages : page;

      if (this.currentPage === page) {
        return;
      }
      this.currentPage = page;
      if (!limit) {
        this.getDishesWithoutTop();
      }
      // this.getDishesWithoutTop();
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
}

a {
  text-decoration: none;
  color: #302939;
}
.navbar-spacing {
  height: 60px;
}
.footer-spacing {
  height: 150px;
}
.search-field {
  position: absolute;
  top: 70px;
  right: 10px;
  width: 25%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .search {
    display: flex;
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
}
.shrink {
  position: absolute;
  top: 70px;
  left: 10px;
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-family: "Poppins", sans-serif;
  .row {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-inline: 6px;
    label {
      font-size: 0.75em;
    }
    input {
      width: 188px;
    }
  }
  .sort {
    font-size: 0.8em;
  }
}

.categories {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .category {
    padding: 4px 10px;
    background-color: #ffd8d8;
    border-radius: 100vmax;
    margin: 4px;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:hover {
      box-shadow: inset 0px 0px 8px rgba(170, 170, 170, 0.2);
    }
  }
}
.search-field {
  label {
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    margin-top: 6px;
    margin-left: 3px;
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
  .nav-button {
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
  position: relative;
  height: 100%;
  min-width: 700px;
  position: relative;
}
.body {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  padding: 0px;
  width: 100%;
  min-width: 700px;
  flex-grow: 1;
}
</style>
