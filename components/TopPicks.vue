<template>
    <div class="top-picks">
        <TopPickCard 
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <TopPickCard 
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
        <TopPickCard 
            title="Dish Name" 
            description="This is a description of the dish which is a lot of text to make it look like it is a description of the dish."
            :tags= '["25 minutes", "Medium Difficulty"]'
            dishImage="https://source.unsplash.com/gySMaocSdqs/600x300"
        />
    </div>    
</template>
<script>
import TopPickCard from '~~/components/TopPickCard.vue'
export default {
    name: 'TopPicks',
    components: { TopPickCard },
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