<template>
    <div class="explore-card">
            <div class="image-panel">
                <img class="image" :src="dishImage" alt="Unsplash computer image with cat" />      
            </div>  
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
        </div>
</template>
<script>
export default {
    name: 'ExploreCard',
    props: {
        title: String,
        description: String,
        tags: Array,
        dishImage: String,
    },
}
</script>
<style lang="scss">
    .explore-card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 400px;
        box-shadow: 0px 2px 6px rgba(176, 176, 176, 0.35);
        margin: 40px 20px;  
        .info-panel{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            width: 100%;
            height: 50%;
            background-color: #D8FFFF;
            .info-text{
                .info-panel-title{
                    font-family: 'Poppins', sans-serif;
                    font-size: 28px;
                    font-weight: bold;
                    color: #302939;
                    margin: 12px 0px 3px 0px;
                    text-align: center;
                }
                .info-panel-description{
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    color: #50595C;
                    margin: 0px 12px;
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
                    font-size: 12px;
                    color: #ffffff;
                    margin: 0px 15px;
                    text-align: center;
                    background-color: #50595C;
                    border-radius: 8px;
                    padding: 6px;
                    margin: 2px;
                }
            }
        }
        .image-panel{
            width: 100%;
            height: 50%;
            background-color: #D8FFFF;
            object-fit: fill;
            overflow: hidden;
            text-align: center;
            .image{
                object-fit: fill;
                margin: 0 -100%;
            }
        }
    }
</style>