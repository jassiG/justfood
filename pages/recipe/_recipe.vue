<template>
    <div class="recipe">
        <Navbar />
        <div class="top-image">
            <!-- <img :src="dish.dishImage.url" alt="dish image" /> -->
            <!-- <p>{{ dish.mainContent }}</p> -->
        </div>
    </div>
</template>
<script>
import NavBar from '~~/components/Navbar.vue'
export default {
    name: "Recipe",
    components: { NavBar },
    props: {
        dish: {},
    },
    fetch(){
        console.log("Recipe Data", this.dish)
    },
}
</script>
<style lang="scss">
    a {
        text-decoration: none;
        color: #302939;
    }
    .recipe{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>