<template>
    <div>
        <!-- <Loading v-if="$fetchState.pending"/> -->
        <!-- navbar -->
        <div class="home">
            <Navbar  />
            <!-- Search -->
            <div class="filters">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28px" height="28px"><g id="Layer_32" data-name="Layer 32"><path d="M33.5,19.14V12a1.5,1.5,0,0,0-3,0v7.14a6.07,6.07,0,0,0,0,11.74V52a1.5,1.5,0,0,0,3,0V30.88C39.52,29.34,39.52,20.67,33.5,19.14ZM32,28.07a3.07,3.07,0,0,1,0-6.13A3.07,3.07,0,0,1,32,28.07Z"/><path d="M53.5,32a6.07,6.07,0,0,0-4.56-5.87V12a1.5,1.5,0,0,0-3,0V26.13a6.07,6.07,0,0,0,0,11.74V52a1.5,1.5,0,0,0,3,0V37.87A6.07,6.07,0,0,0,53.5,32Zm-6,3.06a3.06,3.06,0,0,1,0-6.12A3.06,3.06,0,0,1,47.46,35.06Z"/><path d="M18.06,37V12a1.5,1.5,0,1,0-3,0V37a6.07,6.07,0,0,0,0,11.73V52a1.5,1.5,0,0,0,3,0V48.74A6.07,6.07,0,0,0,18.06,37Zm-1.5,8.94a3.07,3.07,0,0,1,0-6.13A3.07,3.07,0,0,1,16.56,45.94Z"/></g></svg>
                </div>
                <div class="filter-text">
                    filters
                </div>
                <div class="chips">
                    <div class="chip">Under 30 minutes</div>
                    <div class="chip">Beginner Friendly</div>
                    <div class="chip">Vegan</div>
                </div>
            </div>
            <div class="search">
                <input @keyup.escape="reset" type="text" placeholder="Search Dishes" v-model.lazy="searchInput" />
                <!-- <button class="button" @click="search">Search</button>
                <button class="button" @click="reset">Reset</button> -->
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
    width: 25%;
    max-width: 350px;
    flex-direction: row;
    justify-content: flex-start;
    // expand

    // padding: 10px 16px;
    box-shadow: 0px 0px 8px rgba(170, 170, 170, 0.2);
    input {
        padding: 12px 6px;
        font-size: 14px;
        border: none;
        &:focus {
            outline: #d8ffffb9 solid 2px;
        }
        flex-grow: 3;
    }
    .button {
        padding: 0px 4px;
        border: 1px solid  #ffffff;
        background-color: #FFD8D8;
    }
}
.filters{
    position: absolute;
    top: 70px;
    left: 10px;
    display: flex;
    align-items: center;
    .icon{
        margin-top:4px;
    }
    .filter-text{
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #302939;
        text-align: center;
        // margin-top: 2px;
    }
    .chips{
        display: flex;
        flex-direction: row;
        margin: 0px 6px;   
        .chip{
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            padding: 2px 4px;
            font-weight: 300;
            color: #302939;
            text-align: center;
            background-color: $primary-color;
            border-radius: 8px;
            margin: 2px 2px;
            &:hover{
                // border: #d8ffff 2px solid;
                box-shadow: #d8ffff 0px 0px 6px;
            }
        }
    }
}
.home{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    width: 100%;
    min-width: 700px;
    position: relative;
}
</style>
