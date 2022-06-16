<template>
    <div>
        <div class="heading">
            <div class="line"></div>
            {{ title }}
            <div class="line"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Heading",
    props: ['title'],
}
</script>
<style lang="scss">
    .heading{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        color: #302939;
        .line{
            width: 40px;
            height: 2px;
            background-color: #50595C;
            margin: 0px 10px;
        }
    }
</style>