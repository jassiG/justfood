<template>
  <div class="body">
    <Navbar />
    <div class="navbar-spacing"></div>
    <!-- <h1>Form page</h1> -->

    <form v-if="!submitted" ref="form" @submit.prevent="handleOnSubmit2">
      <div v-if="error" class="error">
        <p v-for="(err, idx) in error" :key="idx">
          {{ err.message }}
        </p>
      </div>
      <div class="form-container">
        <div class="form-title">Submit Your Recipe</div>
        <div class="description">
          <p>
            Now you can also submit your own recipe to your favorite cooking
            site! Share the love of cooking with everyone and let the world
            taste your magic.
          </p>
        </div>

        <!-- Input Fields -->
        <div class="row--form">
          <!-- <h2>[{{ col.title }}]</h2> -->
          <input
            v-model="form.title"
            name="title"
            type="text"
            placeholder="Recipe Name"
            required
          />
          <input
            v-model="form.description"
            name="description"
            type="text"
            placeholder="Description"
            required
          />
          <textarea
            v-model="form.mainContent"
            name="mainContent"
            type="text"
            placeholder="Instructions"
            rows="30"
            cols="90"
            required
          />
          <input
            name="dishImage"
            type="file"
            placeholder="Dish Image"
            @change="uploadFile"
          />
          <input
            v-model="form.timeInMinutes"
            name="timeInMinutes"
            type="number"
            placeholder="Time in Minutes"
            required
          />
          <!-- Input Difficulty -->
          <div class="difficulty">
            <input
              v-model="form.difficulty.label"
              type="radio"
              id="easy"
              name="difficulty"
              value="Easy"
            />
            <label for="easy">Easy</label><br />
            <input
              v-model="form.difficulty.label"
              type="radio"
              id="medium"
              name="difficulty"
              value="Medium"
            />
            <label for="medium">Medium</label><br />
            <input
              v-model="form.difficulty.label"
              type="radio"
              id="hard"
              name="difficulty"
              value="Hard"
            />
            <label for="hard">Hard</label>
          </div>
        </div>
        <div v-for="i in num_ingredients" class="ingrediens">
          <input
            v-model="form.ingredient[i - 1]"
            :name="'ingredient[' + i + '][ingredient]'"
            type="text"
            :placeholder="'ingredient ' + i"
          />
          <input
            v-model="form.amount[i - 1]"
            :name="'ingredient[' + i + '][amount]'"
            type="text"
            placeholder="Amount"
          />
        </div>
        <div class="ingredient-buttons">
          <button type="button" @click="changeIngredient('+')">Add</button>
          <button type="button" @click="changeIngredient('-')">Remove</button>
        </div>
        <div v-for="i in num_tags" class="tags">
          <input
            v-model="form.aditionalTags[i - 1]"
            :name="'aditionalTags[' + i + ']'"
            type="text"
            :placeholder="'Tag ' + i"
          />
        </div>
        <div class="tag-buttons">
          <button type="button" @click="changeTag('+')">Add</button>
          <button type="button" @click="changeTag('-')">Remove</button>
        </div>

        <!-- Control Buttons -->
        <div class="row--bottom-next">
          <button @click="handleOnSubmit2">submit</button>
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
    <div class="footer-spacing"></div>
    <Footer />
  </div>
</template>

<script>
const FORM_ID = 3; // ID of the form

export default {
  data: () => {
    return {
      submitted: false,
      submittedId: null,
      error: null,
      file_id: null,
      num_ingredients: 1,
      num_tags: 1,
      file_id: null,
      form: {
        subject: "",
        contents_type: 18,
        topics_flg: 1,
        contents: "",
        title: "",
        description: "",
        mainContent: "",
        dishImage: {
          file_id: "",
          file_nm: "",
          desc: "",
        },
        timeInMinutes: "",
        difficulty: {
          key: "",
          label: "",
        },
        ingredient: [""],
        amount: [""],
        aditionalTags: [""],
      },
    };
  },
  methods: {
    async uploadFile(e) {
      const fm = new FormData();
      fm.append("file", e.target.files[0]);

      const { file_id } = await this.$axios.$post(
        process.env.BASE_URL + `file`,
        fm,
        {
          headers: {
            "Content-Type": "multipart/form-data", // required to post file as a binary
          },
        }
      );
      this.form.dishImage.file_id = file_id;
      console.log("File ID: ", this.form.dishImage.file_id);
    },
    async handleOnSubmit2(e) {
      e.preventDefault();
      // Additional Processing
      switch (this.form.difficulty.label) {
        case "Easy":
          this.form.difficulty.key = "1";
          break;
        case "Medium":
          this.form.difficulty.key = "2";
          break;
        case "Hard":
          this.form.difficulty.key = "3";
          break;
        default:
          this.form.difficulty.key = "2";
          this.form.difficulty.label = "Medium";
          break;
      }
      this.form.subject = this.form.title;
      this.form.timeInMinutes = parseInt(this.form.timeInMinutes);
      // this.form.ingredient.map((ingredient) => {
      //   ingredient =
      //     "{ ingredient: " +
      //     ingredient.ingredient +
      //     ", amount: " +
      //     ingredient.amount +
      //     "}";
      // });
      console.log("Handle Submit Final Form: ", this.form);
      try {
        // post data
        const { id } = await this.$axios.$post(
          process.env.BASE_URL + `post-dish`,
          this.form
        );
        this.error = null;
        this.submittedId = id;
        this.submitted = true;
      } catch (e) {
        this.error = [`${e}`, ...e.response.data.errors];
      }
    },
    changeIngredient(mode) {
      if (mode === "+" && this.num_ingredients < 15) {
        this.form.ingredient.push("");
        this.form.amount.push("");
        this.num_ingredients++;
      } else if (mode === "-" && this.num_ingredients > 1) {
        this.num_ingredients--;
        this.form.ingredient.pop();
        this.form.amount.pop();
      }
    },
    changeTag(mode) {
      if (mode === "+" && this.num_tags < 8) {
        this.form.aditionalTags.push("");
        this.num_tags++;
      } else if (mode === "-" && this.num_tags > 1) {
        this.num_tags--;
        this.form.aditionalTags.pop();
      }
    },
    textLines2texts(textLines = "") {
      return textLines.split("\r\n");
    },
    // async handleOnSubmit(e) {
    //   e.preventDefault();

    //   // collect input elements
    //   const formInputElements = Array.from(this.$refs.form.elements).filter(
    //     (elm) => elm.tagName.toLowerCase() === "input"
    //   );

    //   // transform key:value inputs to an object
    //   const body = formInputElements
    //     .map((elm) => ({ [elm.name]: elm.value }))
    //     .reduce((prev, cur) => ({ ...prev, ...cur }), {});

    //   try {
    //     // post data
    //     const { id } = await this.$axios.$post(
    //       process.env.BASE_URL + `recipe-form?id=${FORM_ID}`,
    //       body
    //     );
    //     this.error = null;
    //     this.submittedId = id;
    //     this.submitted = true;
    //   } catch (e) {
    //     this.error = [`${e}`, ...e.response.data.errors];
    //   }
    // },
    handleOnBack(e) {
      e.preventDefault();
      this.submitted = false;
    },
  },
};
</script>

<style scoped lang="scss">
.body {
  position: relative;
}
.footer-spacing {
  height: 150px;
}
input {
  border: none;
  flex-grow: 1;
}
.navbar-spacing {
  height: 60px;
}
.error {
  color: rgb(223, 87, 87);
}
textarea {
  resize: none;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 650px;
  margin: 30px auto;
  padding-inline: 2.5em;
  border-radius: 1em;
  background-color: $primary-color;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  .form-title {
    width: 100%;
    font-size: 2em;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: #302939;
    margin-top: 0.5em;
  }
  .description {
    width: 100%;
    font-size: 1em;
    color: #625f66;
    font-family: "Poppins", sans-serif;
    margin-bottom: 10px;
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
