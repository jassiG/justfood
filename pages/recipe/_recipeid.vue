<template>
    <div class="recipe">
        <Navbar />
        <div class="content-block">
            <div class="top-image">
                <img :src="this.dish.dishImage.url" alt="dish image" />
            </div>
            <div class="title">
                {{ this.dish.subject }}
            </div>
            <hr>
            <div class="main-content">
                {{ dish.mainContent }}
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '~~/components/Navbar.vue'
import axios from 'axios'
export default {
    name: "Recipe",
    components: { NavBar },
    data () {
        return {
            dishId: Number,
            dish: {},
            tags: [],
        }
    },
    async fetch(){
        // this.dishId = this.$route.params.recipeid
        await this.getDish()
        return
    },
    methods: {
        async getDish() {
            try {
                // REMOVE THIS LINE POSITIVELY WHEN DONE!!
                if (!process.env.BASE_URL) {process.env.BASE_URL = 'https://sample-jassi.g.kuroco.app/rcms-api/5/'}
                const response = await axios.get(
                    process.env.BASE_URL + 'get-dish/' + this.$route.params.recipeid
                )
                this.dish = response.data.details
                this.tags = this.dish.tag
                console.log("Dish\n", this.dish)
            } catch (error) {
                console.log(error)
            }
            return
        }
    },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    a {
        text-decoration: none;
        color: #302939;
    }
    .recipe{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        .content-block{
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: center;
            // background-color: antiquewhite;
            width: 60%;
            padding: 0px 30px;
            // box-shadow: 0px 0px 4px rgb(175, 175, 175, 0.15);
            @media (min-width: 500px) {
                width: 90%;
                padding: 0px 10px;
            }
            @media (min-width: 1000px) {
                width: 60%;
            }
            .top-image{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 400px;
                // background-color: rgb(215, 255, 255);
                img{
                    width: auto;
                    height: auto;
                    object-fit: cover;
                    overflow: hidden;
                    // background-color: beige;
                }
            }
            .title{
                width: 100%;
                font-size: 2em;
                font-family: 'Poppins', sans-serif;
                font-weight: bold;
                padding: 10px;
                color: #302939;
            }
            // .hr{
            //     width: 100%;
            //     border: 0.5px solid #302939;
            //     margin: 10px 0px;
            // }
            .main-content{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: auto;
                // background-color: rgb(215, 255, 222);
                // padding: 20px;
                font-family: 'Poppins', sans-serif;
                white-space:pre-wrap;
                font-family: 'Poppins', sans-serif;
                color: #302939;
            }
        }
    }
</style>