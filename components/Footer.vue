<template>
  <div class="footer">
    <div class="footer-container">Footer</div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
  background-color: $primary-color;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .footer-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    flex-grow: 1;
    max-width: 120px;
  }
}
</style>
