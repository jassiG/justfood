<template>
    <div class="top-picks">
        <TopPickCard v-for="(dish,index) in topDishes" :key="index" :dish="dish"
            :title="dish.subject"
            :description="dish.description"
            :tags= "dish.tag"
            :dishImage="dish.dishImage.url"
        />
    </div>    
</template>
<script>
import TopPickCard from '~~/components/TopPickCard.vue'
export default {
    name: 'TopPicks',
    components: { TopPickCard },
    props: {
        topDishes: [],
    },
    fetch(){
        // console.log("Recipe Data", this.recipeData)
    }
}
</script>
<style lang="scss">
    .top-picks{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
</style>