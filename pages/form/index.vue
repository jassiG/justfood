<template>
  <div class="body">
    <client-only>
      <Navbar />
    </client-only>
    <div class="navbar-spacing"></div>
    <!-- <h1>Form page</h1> -->
    <form v-if="!submitted" ref="form" @submit.prevent="handleOnSubmit2">
      <!-- <div v-if="error" class="error">
        <p v-for="(err, idx) in error" :key="idx">
          {{ err.message }}
        </p>
      </div> -->
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

        <div class="input-row">
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
        </div>
        <!-- <div class="input-row"> -->
        <!-- <textarea
            name="mainContent"
            type="text"
            placeholder="Instructions"
            rows="30"
            required
          /> -->
        <div class="editor">
          <editor v-model="form.mainContent" />
        </div>
        <!-- </div> -->
        <div class="input-row">
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
            <label
              ><input
                v-model="form.difficulty.label"
                type="radio"
                id="easy"
                name="difficulty"
                value="Easy"
              />
              <span>Easy</span></label
            >
            <label
              ><input
                v-model="form.difficulty.label"
                type="radio"
                id="medium"
                name="difficulty"
                value="Medium"
                checked
              />
              <span>Medium</span></label
            >
            <label
              ><input
                v-model="form.difficulty.label"
                type="radio"
                id="hard"
                name="difficulty"
                value="Hard"
              />
              <span>Hard</span></label
            >
          </div>
        </div>
        <div class="input-row full-stretch">
          <div class="input-column">
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
              <button type="button" @click="changeIngredient('-')">
                Remove
              </button>
            </div>
          </div>
          <div class="input-column">
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
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="button-row">
          <NuxtLink to="/" class="button"> Home </NuxtLink>
          <button @click="handleOnSubmit2" class="button">Submit</button>
        </div>
        <div v-if="error" class="error">
          <p>Please fill the entire form appropriately.</p>
        </div>
      </div>
    </form>
    <form v-else>
      <div class="navbar-spacing"></div>

      <div class="success">
        <img src="../../assets/party.png" width="200px" alt="" />
        <div class="thank-you">
          <h2>Your Recipe Has Been Submitted.</h2>
          <div class="thank-you-subtitle">
            <p>Thank You! We will keep it in our cookbook (●'◡'●)</p>
          </div>
        </div>
        <div></div>
        <div class="inquiry-id">
          <h2>Inquiry ID: {{ submittedId }}</h2>
        </div>
        <div class="button">
          <NuxtLink to="/"> Home </NuxtLink>
        </div>
      </div>
    </form>
    <div class="footer-spacing"></div>
    <Footer />
  </div>
</template>

<script>
import Editor from "../../components/Editor.vue";
export default {
  middleware: "auth",
  components: {
    Editor,
  },
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
      );
      this.form.dishImage.file_id = file_id;
      console.log("File ID: ", this.form.dishImage.file_id);
    },
    async handleOnSubmit2(e) {
      e.preventDefault();
      // console.log("Form main content: ", this.form.mainContent);
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

      console.log("Handle Submit Final Form: ", this.form);
      try {
        // post data
        const { id } = await this.$axios.$post(
          process.env.BASE_URL + `dish/create`,
          this.form,
          
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
    handleOnBack(e) {
      e.preventDefault();
      this.submitted = false;
    },
  },
};
</script>

<style scoped lang="scss">
.body {
  min-height: 100vh;
  position: relative;
}

.footer-spacing {
  height: 150px;
}

button {
  background-color: $secondary-color;
  border: none;
  padding: 10px 26px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: translate(0, 2px);
  }
  cursor: pointer;
}

.error {
  color: rgb(223, 87, 87);
  font-size: 0.8em;
  text-align: center;
}
textarea {
  resize: none;
}

.success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .thank-you {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
    text-align: center;
    .thank-you-subtitle {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #4d4a52;
    }
  }
  .inquiry-id {
    font-size: 1rem;
    font-weight: normal;
    color: #99979c;
    margin-bottom: 1rem;
  }
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
  span {
    display: flex;
    align-items: center;
    padding: 0.07em 0.15em;
    margin: 2px;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;
    &:hover {
      // background-color: mix(#fff, $primary-color, 84%);
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }
    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: #fff;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 0.375em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em $primary-color;
    }
  }
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
  input {
    border: none;
    flex-grow: 1;
    max-width: 300px;
    padding: 0.25rem;
    // margin: 4px;
    background-color: #fff4f5;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }
  input[type="radio"] {
    position: absolute;
    left: -9999px;
    &:checked + span {
      // background-color: mix(#fff, $primary-color, 84%);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
      &:before {
        box-shadow: inset 0 0 0 0.4375em $secondary-color;
      }
    }
  }
  .navbar-spacing {
    height: 60px;
  }
  .editor {
    border: none;
    box-sizing: border-box;
    flex-grow: 1;
    // width: 100%;
    padding: 0.25rem;
    // margin: 2px;
    background-color: #fff4f5;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }
  textarea {
    border: none;
    box-sizing: border-box;
    flex-grow: 1;
    // width: 100%;
    padding: 0.25rem;
    // margin: 2px;
    background-color: #fff4f5;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
  }
  .input-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 5px;
    gap: 10px;
    input {
      min-height: 20px;
      // margin-inline: 4px;
      // max-width: 120px;
    }
  }
  .input-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 5px;
    gap: 10px;
    input {
      min-height: 20px;
      min-width: 160px;
      // margin-inline: 4px;
      // max-width: 120px;
    }
    button {
      width: 80px;
      padding: 10px;
    }
  }
  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1em;
  }
  .full-stretch {
    align-items: stretch;
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
