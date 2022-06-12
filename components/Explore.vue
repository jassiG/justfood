<template>
    <div class="explore">
        <ExploreCard v-for="(dish,index) in dishes" :key="index" :dish="dish"
            :title="dish.subject"
            :description="dish.description"
            :tags= "dish.tag"
            :dishImage="dish.dishImage.url"
        />
        <!-- <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <ExploreCard
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        /> -->
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