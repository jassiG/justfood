<template>
  <div class="explore">
    <nuxt-link
      v-for="(dish, index) in dishes"
      :key="index"
      :to="'/recipe/' + dish.topics_id"
    >
      <ExploreCard
        :title="dish.subject"
        :description="dish.description"
        :time="dish.timeInMinutes"
        :difficulty="dish.difficulty"
        :dishImage="dish.dishImage.url"
        :favCount="dish.favorite_cnt"
        :aditionalTags="dish.aditionalTags"
      />
    </nuxt-link>
  </div>
  <!-- <div class="sort">
      Sort By:
      <label
        ><input
          v-model="sortby"
          type="radio"
          id="date"
          name="sort"
          value="date"
          checked
          @change="setSort"
        />
        <span>Newest</span></label
      >
      <label
        ><input
          v-model="sortby"
          type="radio"
          id="fav"
          name="sort"
          value="favorite"
          @change="setSort"
        />
        <span>Most Favorite</span></label
      >
    </div> -->
</template>
<script>
import ExploreCard from "~~/components/ExploreCard.vue";
export default {
  name: "Explore",
  components: { ExploreCard },
  props: {
    dishes: [],
  },
  data() {
    return {
      sortby: "date",
    };
  },
  fetch() {
    // console.log("sorting because fetch...");
    // this.setSort();
  },

  methods: {
    setSort() {
      let temp = this.dishes;
      if (this.sortby == "date") {
        temp.sort((a, b) => {
          return this.compareDates(b.inst_ymdhi, a.inst_ymdhi);
        });
      } else if (this.sortby == "favorite") {
        temp.sort((a, b) => {
          return b.favorite_cnt - a.favorite_cnt;
        });
      }
      this.dishes = temp;
    },
    compareDates(b, a) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    },
  },
};
</script>
<style lang="scss">
.explore-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 96%;
  .explore {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
  input[type="radio"] {
    position: absolute;
    left: -9999px;
    &:checked + span {
      // background-color: mix(#fff, $primary-color, 84%);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
      &:before {
        box-shadow: inset 0 0 0 0.4375em $secondary-color;
      }
    }
  }
  .sort {
    min-width: 130px;
    span {
      display: flex;
      align-items: center;
      padding: 0.07em 0.15em;
      margin: 2px;
      border-radius: 99em; // or something higher...
      transition: 0.25s ease;
      &:hover {
        // background-color: mix(#fff, $primary-color, 84%);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
      &:before {
        display: flex;
        flex-shrink: 0;
        content: "";
        background-color: #fff;
        width: 1.4em;
        height: 1.4em;
        border-radius: 50%;
        margin-right: 0.375em;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.125em $primary-color;
      }
    }
  }
  .sort-narrow {
    min-width: 70px;
  }
}
</style>
