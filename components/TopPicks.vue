<template>
  <div class="top-picks">
    <nuxt-link
      v-for="(dish, index) in topDishes"
      :key="index"
      :to="'/recipe/' + dish.topics_id"
    >
      <TopPickCard
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
</template>
<script>
import TopPickCard from "~~/components/TopPickCard.vue";
export default {
  name: "TopPicks",
  components: { TopPickCard },
  props: {
    topDishes: [],
  },
};
</script>
<style lang="scss">
.top-picks {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
