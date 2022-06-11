<template>
    <div class="navbar">
        <div class="navbar-container">
            <div class="navbar-logo">
                <a href="/">
                    JustFood
                </a>
            </div>
            <div class="nav-text">
                <a href="/">
                    Home
                </a>
                <NuxtLink  to="/About">
                    About
                </NuxtLink>
                <a href="/About">
                    Contact
                </a>
                <a href="/About">
                    Account
                </a>
            </div>
        </div>
        <div class="social">
            <a href="https://www.facebook.com/">
                <object data="../assets/icons/facebook-square-brands.svg" width="30" height="30"> </object>
            </a>
            <a href="https://www.instagram.com/">
                <object data="../assets/icons/instagram-square-brands.svg" width="30" height="30"> </object>
            </a>
            <a href="https://www.twitter.com/">
                <object data="../assets/icons/twitter-square-brands.svg" width="30" height="30"> </object>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: "Navbar",
    data() {
        return {};
    },
}
</script>
<style lang="scss">
.navbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: rgb(255, 255, 255);

    box-shadow: 0px 2px 6px rgba(176, 176, 176, 0.25);
    
    .navbar-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 50px;
        flex-grow: 5;
        justify-content: space-between;
        // gap: 766px;
        .navbar-logo{
            font-family: 'Poor Story', cursive;
            font-size: 48px;
            max-width: 200px;
            flex-grow: 1;
        }
        .nav-text{
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            padding: 0px;
            max-width: 350px;
            flex-grow: 1;
            // gap: 55px;
        }
    }
    .social{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;
        flex-grow: 1;
        max-width: 120px;
        // it was not registering a click without it
        object{
            pointer-events: none;
        }
    }
}
</style>