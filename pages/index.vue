<template>
    <div>
        <Loading v-if="$fetchState.pending"/>
        <!-- navbar -->
        <div v-else class="home">
            <Navbar  />
            <Heading title="Today's Top Picks"/>
            <TopPicks :topDishes="this.topDishes"/>
            <Heading title="Explore"/>
            <Explore :dishes="this.dishes"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from '~~/components/Navbar.vue'
import Heading from '~~/components/Heading.vue'
import Explore from '~~/components/Explore.vue'
export default {
    name: "Home",
    components: { Navbar, Heading, Explore },
    data() {
        return {
            dishes: [],
            topDishes: [],
        }
    },
    async fetch(){
        await this.getDishes()
        return
    },
    fetchDelay: 500,
    methods: {
        async getDishes() {
            try {
                const response = await axios.get(
                    process.env.BASE_URL + 'all-dishes'
                )
                // console.log("response", response)
                if (!this.dishes) {this.dishes = []}
                if (!this.topDishes) {this.topDishes = []}
                this.dishes = response.data.list
                // console.log("Dishes", this.dishes)
                this.dishes.forEach((dish, index) => {
                    if (dish.isTop[0].key === "1") {
                        this.topDishes.push(dish)
                        this.dishes.splice(index, 1)
                    }
                })
                // console.log("Top Dishes", this.topDishes)
            } catch (e) {
                console.log(e.message)
            }
            return
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
