<template>
    <div class="explore">
        <nuxt-link v-for="(dish,index) in dishes" :key="index" :to="{path:'/recipe/' + dish.topics_id, props:{dish: dish}}" >
            <ExploreCard
                :title="dish.subject"
                :description="dish.description"
                :tags= "dish.tag"
                :dishImage="dish.dishImage.url"
            />
        </nuxt-link>
    </div>
</template>
<script>
import ExploreCard from '~~/components/ExploreCard.vue'
export default {
    name: "Explore",
    components: { ExploreCard },
    props: {
        dishes: [],
    }
}
</script>
<style lang="scss">
    .explore{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 80%;
    }
</style>