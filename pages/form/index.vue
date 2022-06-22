<template>
  <div>
    <Navbar />
    <div class="navbar-spacing"></div>
    <!-- <h1>Form page</h1> -->

    <form v-if="!submitted" ref="form">
      <div v-if="error" class="error">
        <p v-for="(err, idx) in error" :key="idx">
          {{ err.message }}
        </p>
      </div>
      <div class="form-container">
        <div class="name">{{ name }}</div>
        <div class="description">
          <p v-for="(line, idx) in textLines2texts(info)" :key="idx">
            {{ line }}
          </p>
        </div>

        <!-- Input Fields -->
        <div v-for="col in cols" :key="col.objKey" class="row--form">
          <!-- <h2>[{{ col.title }}]</h2> -->
          <input :name="col.objKey" type="text" :placeholder="col.title" />
        </div>

        <div class="row--bottom-next">
          <button @click="handleOnSubmit">submit</button>
          <NuxtLink to="/"> Home </NuxtLink>
        </div>
      </div>
    </form>

    <form v-else>
      <div class="row--status">
        <h2>Inquiry ID</h2>
        <div>
          {{ submittedId }}
        </div>
      </div>

      <div class="row--status">
        <h2>Thank you message</h2>
        <div>
          <p v-for="(line, idx) in textLines2texts(thanksText)" :key="idx">
            {{ line }}
          </p>
        </div>
      </div>

      <div class="row--bottom-back">
        <button @click="handleOnBack">back</button>
      </div>
    </form>
  </div>
</template>

<script>
const FORM_ID = 3; // ID of the form

export default {
  // async asyncData({ $axios }) {
  //   const response = await $axios.$get(process.env.BASE_URL + `post-dish/`, {
  //     body: {
  //       formId: FORM_ID,
  //     },
  //   });
  //   return {
  //     name: response.details.inquiry_name,
  //     info: response.details.inquiry_info,
  //     thanksText: response.details.thanks_text,
  //     cols: Object.entries(response.details.cols).map(([k, v]) => ({
  //       objKey: k,
  //       ...v,
  //     })),
  //   };
  // },
  data: () => {
    return {
      submitted: false,
      submittedId: null,
      error: null,
    };
  },
  methods: {
    textLines2texts(textLines = "") {
      return textLines.split("\r\n");
    },
    async handleOnSubmit(e) {
      e.preventDefault();

      // collect input elements
      const formInputElements = Array.from(this.$refs.form.elements).filter(
        (elm) => elm.tagName.toLowerCase() === "input"
      );

      // transform key:value inputs to an object
      const body = formInputElements
        .map((elm) => ({ [elm.name]: elm.value }))
        .reduce((prev, cur) => ({ ...prev, ...cur }), {});

      try {
        // post data
        const { id } = await this.$axios.$post(
          process.env.BASE_URL + `recipe-form?id=${FORM_ID}`,
          body
        );
        this.error = null;
        this.submittedId = id;
        this.submitted = true;
      } catch (e) {
        this.error = [`${e}`, ...e.response.data.errors];
      }
    },
    handleOnBack(e) {
      e.preventDefault();
      this.submitted = false;
    },
  },
};
</script>

<style scoped lang="scss">
input {
  // width: 100%;
  border: none;
  flex-grow: 1;
}
.navbar-spacing {
  height: 60px;
}
.error {
  color: rgb(223, 87, 87);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 700px;
  margin: 0 auto;
  padding-inline: 2em;
  border-radius: 1em;
  background-color: $primary-color;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  .name {
    font-size: 1.5em;
    color: #302939;
    font-weight: bold;
  }
  .description {
    font-size: 0.8em;
    color: #302939;
  }
}

.row--bottom-next {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
}
.row--bottom-back {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
}
</style>
