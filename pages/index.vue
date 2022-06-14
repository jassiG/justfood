<template>
    <div>
        <!-- <Loading v-if="$fetchState.pending"/> -->
        <!-- navbar -->
        <div class="home">
            <Navbar  />
            <!-- Search -->
            <div class="container search">
                <input type="text" placeholder="Search Dishes" v-model.lazy="searchInput" />
                <button class="button" @click="search">Search</button>
                <button class="button" @click="reset">Reset</button>
            </div>
            <Heading title="Today's Top Picks"/>
            <TopPicks :topDishes="this.topDishes"/>
            <Heading title="Explore"/>
            <Explore :dishes="this.dishes" :searchInput="this.searchInput"/>
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
            searchInput: '',
        }
    },
    async fetch(){
            await this.getDishes()
    },
    fetchDelay: 500,
    methods: {
        async getDishes() {
            try {
                // REMOVE THIS LINE POSITIVELY WHEN DONE!!
                if (!process.env.BASE_URL) {process.env.BASE_URL = 'https://sample-jassi.g.kuroco.app/rcms-api/5/'}
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
        },
        async search() {
            this.searchInput = this.searchInput.toLowerCase()
        },
        async reset() {
            this.searchInput = ''
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
.search {
    position: absolute;
    top: 70px;
    right: 10px;
    display: flex;
    width: 350px;
    flex-direction: row;
    justify-content: flex-start;
    // padding: 10px 16px;
    box-shadow: 0px 0px 8px rgba(170, 170, 170, 0.2);
    input {
        padding: 12px 6px;
        font-size: 14px;
        border: none;
        &:focus {
        outline: none;
        }
        flex-grow: 3;
    }
    .button {
        padding: 0px 4px;
        border: 1px solid  #ffffff;
        background-color: #FFD8D8;
    }
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
