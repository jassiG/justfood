<template>
  <div class="explore-card">
    <div class="image-panel">
      <img
        class="image"
        :src="dishImage + '?height=200&fit=cover'"
        :alt="title"
      />
    </div>
    <div class="info-panel">
      <div class="info-text">
        <div class="info-panel-title">
          {{ title }}
        </div>
        <div class="info-panel-description">
          {{ description.slice(0, 100) }}
          <span v-if="description.length > 100">...</span>
        </div>
      </div>
      <div class="info-tags">
        <div class="row">
          <div class="info-tag">
            <div class="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60.35 64"
                width="16px"
                height="16px"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      class="cls-1"
                      d="M32.84,9.38V5.46a31.38,31.38,0,0,1,7,1.39l1.65-5.07a36.84,36.84,0,0,0-22.61,0l1.65,5.07a31.38,31.38,0,0,1,7-1.39V9.38a27.37,27.37,0,1,0,5.33,0ZM30.17,58.67a22,22,0,1,1,22-22A22,22,0,0,1,30.17,58.67Z"
                    />
                    <path
                      class="cls-1"
                      d="M56,18.9l4.39-3a36.48,36.48,0,0,0-9.42-9.41l-3,4.39A31.12,31.12,0,0,1,56,18.9Z"
                    />
                    <path
                      class="cls-1"
                      d="M12.44,10.85l-3-4.39A36.48,36.48,0,0,0,0,15.87l4.39,3A31.12,31.12,0,0,1,12.44,10.85Z"
                    />
                    <path
                      class="cls-1"
                      d="M38.18,40l-5.34-4V21.33a2.67,2.67,0,1,0-5.33,0v16a2.13,2.13,0,0,0,.08.61,1.8,1.8,0,0,0,.21.56,1.43,1.43,0,0,0,.29.48.76.76,0,0,1,.08.11,2.55,2.55,0,0,0,.38.35l0,0,.11.08,10.56,7.92a2.54,2.54,0,0,0,1.6.54A2.74,2.74,0,0,0,43,46.93a2.67,2.67,0,0,0-.54-3.73Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div class="tag-text">{{ time + " Minutes" }}</div>
          </div>
          <div class="info-tag">
            <div class="svg">
              <svg
                x="0px"
                y="0px"
                viewBox="0 0 426.667 426.667"
                xml:space="preserve"
                width="16px"
                height="16px"
              >
                <polygon
                  style="fill: #eeeeee"
                  points="213.333,10.441 279.249,144.017 426.667,165.436 320,269.41 345.173,416.226 213.333,346.91 81.485,416.226 106.667,269.41 0,165.436 147.409,144.017 "
                  id="id_101"
                ></polygon>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </div>
            <div class="tag-text">{{ favCount + " Stars" }}</div>
          </div>
        </div>
        <div class="info-tag">
          <div class="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="16px"
              height="16px"
            >
              <path
                class="st0"
                d="M22.4,8.1C22.7,8,23.1,8,23.5,8c3,0,5.5,2.5,5.5,5.5S26.5,19,23.5,19l0.5,9H8l0.5-9c-3,0-5.5-2.5-5.5-5.5 S5.5,8,8.5,8c0.4,0,0.8,0,1.1,0.1"
              />
              <path class="st0" d="M23,11c0-3.9-3.1-7-7-7s-7,3.1-7,7" />
              <line class="st0" x1="16" y1="21" x2="16" y2="24" />
              <line class="st0" x1="12.5" y1="21" x2="12" y2="23.7" />
              <line class="st0" x1="19.5" y1="21" x2="20" y2="23.7" />
            </svg>
          </div>
          <div class="tag-text">{{ difficulty.label + " Difficulty" }}</div>
        </div>
        <div class="row">
          <div class="hashtag" v-for="tag in aditionalTags">{{'#' + tag.replace(/[^\w\s]/gi, '') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ExploreCard",
  props: {
    title: String,
    description: String,
    time: Number,
    difficulty: Object,
    dishImage: String,
    favCount: Number,
    aditionalTags: Array,
  },
};
</script>
<style lang="scss">
// variables
$card-color: #ffd8d8; //#D8FFFF;
.explore-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 400px;
  box-shadow: 0px 2px 6px rgba(176, 176, 176, 0.35);
  margin: 30px 20px;
  transition: 0.1s ease-in-out all;
  &:hover {
    transform: translate(0px, -5px);
    box-shadow: 0px 2px 8px rgba(176, 176, 176, 0.55);
  }
  .info-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 50%;
    background-color: $secondary-color;
    .info-text {
      .info-panel-title {
        font-family: "Poppins", sans-serif;
        font-size: 23px;
        font-weight: bold;
        color: #302939;
        margin: 12px 2px 3px 2px;
        text-align: center;
        line-height: 1.2em;
      }
      .info-panel-description {
        font-family: "Poppins", sans-serif;
        font-size: 13px;
        color: #50595c;
        margin: 0px 12px;
        line-height: 1.3em;
      }
    }
    .info-tags {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 10px;
      .row {
        display: flex;
        flex-direction: row;
      }
      .info-tag {
        display: flex;
        color: #ffffff;
        margin: 0px 15px;
        background-color: #50595c;
        border-radius: 8px;
        padding: 5px;
        padding-bottom: 2px;
        margin: 2px;
        .svg {
          fill: #ffffff;
          margin-right: 4px;
        }
        .tag-text {
          font-family: "Poppins", sans-serif;
          font-weight: 100;
          font-size: 11px;
          text-align: center;
        }
      }
      .hashtag{
        font-family: "Poppins", sans-serif;
        font-size: 12px;
        font-weight: 100;
        color: #50595c;
        margin-right: 6px;
        margin-top: 2px;
        text-align: center;
        line-height: 1.2em;
      }
    }
  }
  .image-panel {
    width: 100%;
    height: 50%;
    background-color: $secondary-color;
    // overflow: hidden;
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
