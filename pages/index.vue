<template>
    <div>
        <Loading v-if="false"/>
        <!-- navbar -->
        <div class="home">
            <Navbar  />
            <Heading title="Today's Top Picks"/>
            <TopPicks/>
            <Heading title="Explore"/>
            <Explore />
        </div>
    </div>
</template>

<script>

import Navbar from '~~/components/Navbar.vue'
import Heading from '~~/components/Heading.vue'
import Explore from '~~/components/Explore.vue'
export default {
    name: "Home",
    components: { Navbar, Heading, Explore },
    async asyncData({ $axios, app }) {
        try {
            const response = await $axios.$get(
                process.env.BASE_URL + 'all-dishes'
            )
            // console.log(response)
            let dishes = response.list
            let topDishes = []
            // console.log(dishes)
            dishes.forEach((dish, index) => {
                if (dish.isTop[0].key === "1") {
                    topDishes.push(dish)
                    dishes.splice(index, 1)
                }
            })
            console.log(dishes)
            console.log(topDishes)
            return {
                dishes
            }
        } catch (e) {
            console.log(e.message)
        }
    },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
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
.home{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    width: 100%;
    position: relative;
}
</style>
