<template>
  <div class="about">
      <Navbar />
    <div class="mainbody">
      <div class="about-container">
        <div class="slogan">Made with love and a laptop ❣️</div>
        <div class="line"></div>
        <div class="justfood">JustFood</div>
        <div class="product-by">A product by YetToCome Inc</div>
        <div class="content">
          hope that we were some help in bringing joy and taste to your table.
        </div>
        <div class="feedback">Send you love and feedback</div>
        <div class="email">support@yettocomecompany.com</div>
        <div class="button">Buy Me a coffee 🍵</div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "~~/components/Navbar.vue";
export default {
  // middleware: "auth",
  name: "About",
  components: { Navbar },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
  color: #302939;
}
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: #ffffff;
  .mainbody {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-blend-mode: darken;
    background-size: contain;
    background-repeat: no-repeat;
    flex-grow: 20;
    .about-container {
      width: 680px;
      height: 400px;
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
      background-color: $primary-color;
      border-radius: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px;
      .line {
        width: 20%;
        height: 1px;
        background-color: rgb(113, 113, 113);
      }
      .slogan {
        color: #302939;
        margin: 5px;
      }
      .justfood {
        color: #302939;
        font-family: "Poor Story", cursive;
        font-size: 50px;
        font-weight: bold;
        margin: 10px 0px 0px 0px;
      }
      .product-by {
        color: #50595c;
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: bold;
      }
      .content {
        color: #302939;
        font-family: "Poppins", sans-serif;
        font-size: 14px;
        font-weight: 100;
        margin: 50px 0px;
      }
      .feedback {
        color: #302939;
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: bold;
        margin: 10px 0px;
      }
      .email {
        color: #302939;
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: 100;
        margin-top: 5px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
