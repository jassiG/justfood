<template>
    <div class="top-pick-card">
            <div class="info-panel">
                <div class="info-text">
                    <div class="info-panel-title">
                        {{ title }}
                    </div>
                    <div class="info-panel-description">
                        <p>{{ description }}</p>
                    </div>
                </div>
                <div class="info-tags">
                    <div v-for="(tag,index) in tags" :key="index" class="info-tag">{{ tag }}</div>
                </div>
            </div>
            <div class="image-panel">
                <img class="image" :src="dishImage" alt="Unsplash computer image with cat" />      
            </div>
    </div>
</template>
<script>
export default {
    name: 'TopPickCard',
    props: {
        title: String,
        description: String,
        tags: Array,
        dishImage: String,
    },
}
</script>
<style lang="scss">
    .top-pick-card{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: 250px;
        min-width: 450px;
        max-width: 500px;
        box-shadow: 0px 2px 6px rgba(176, 176, 176, 0.35);
        margin: 10px 20px;  
        border-radius: 20px;
        transition: 0.1s ease-in-out all;
        
        &:hover {
            transform: scale(1.01);
            box-shadow: 0px 2px 8px rgba(176, 176, 176, 0.55);
        }
        .info-panel{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            width: 50%;
            height: 100%;
            background-color: #FFD8D8;
            border-radius: 20px 0px 0px 20px;
            .info-text{
                .info-panel-title{
                    font-family: 'Poppins', sans-serif;
                    font-size: 32px;
                    font-weight: bold;
                    color: #302939;
                    margin: 15px 0px 5px 0px;
                    text-align: center;
                }
                .info-panel-description{
                    font-family: 'Poppins', sans-serif;
                    font-size: 15px;
                    color: #50595C;
                    margin: 0px 15px;
                    line-height: 1.3em;
                }   
            }
            .info-tags{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: 10px;
                .info-tag{
                    font-family: 'Poppins', sans-serif;
                    font-weight: 100;
                    font-size: 13px;
                    color: #ffffff;
                    margin: 0px 15px;
                    text-align: center;
                    background-color: #50595C;
                    border-radius: 10px;
                    padding: 7px;
                    margin: 2px;
                }
            }
        }
        .image-panel{
            width: 50%;
            height: 100%;
            background-color: #FFD8D8;
            object-fit: fill;
            overflow: hidden;
            text-align: center;
            border-radius: 0px 20px 20px 0px;
            .image{
                object-fit: fill;
                margin: 0 -100%;
            }
        }
    }
</style>