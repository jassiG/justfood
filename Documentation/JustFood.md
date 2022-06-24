20220609 1326
Status: #coding, #intern
Tags:

# JustFood

# Getting Started

[Follow along this guide](https://kuroco.app/docs/tutorials/beginners-guide/)

## Setup the environment

### Install Nuxt.js

```
npx create-nuxt-app@4.0.0 site-name
```

You can use these following settings:

```
Project name: sample-service-site
Programming language: JavaScript
Package manager: Npm
UI framework: None
Nuxt.js modules: Axios
Linting tools: None
Testing framework: None
Rendering mode: Universal (SSR / SSG)
Deployment target: Static (Static/Jamstack hosting)
Development tools: None
What is your GitHub username? (YOUR GIT USERNAME)
Version control system: Git
```

You can run the app now:

```
cd site-name
npm run dev
```

### Set up your GitHub repository

Create and setup a repository for your Project by using these commands

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/GITHUB-USERNAME/REPOSITORY-NAME.git
git push -u origin main
```

### Integrate GitHub into Kuroco

To integrate GitHub, go to the Kuroco admin panel and click [KurocoFront] -> [GitHub] in the left sidebar panel.
![](Pasted image 20220622185223.png)
And click Authorize GitHub repository, here you give access authorization of your project repo.
After this step, click on Update and you're done.
![](Pasted image 20220622185408.png)

### Deploy your code

To display the website at the URL `https://SITE-KEY.g.kuroco-front.app/`, deploy the code managed on GitHub to KurocoFront.

Add `kuroco_front.json` and `/.github/workflows/build.yaml` file to the Nuxt.js project.
Now add these lines in `kuroco_front.json` file:

```json
{
  "rewrites": [
    {
      "source": ".*",
      "destination": "/index.html"
    }
  ],
  "redirects": [],
  "basic": [],
  "ip_restrictions": []
}
```

this file is use to set basic auth and IP restrictions.

Now for `/.github/workflows/build.yaml`, copy this string from the previous menu:
![](Pasted image 20220622185533.png)

After this, you can push the changes into github and the workflow will run automatically.

Now you can see your site by clicking this button on the bottom of the kuroco dashboard screen:
![](Pasted image 20220622185734.png)

**So far we have followed this flow to integrate Github into Kuroco:**
![](Pasted image 20220622192640.png)

## Adding Content Structure

click on content structure
![](Pasted image 20220622190258.png)
ou will get different type of content structures, these define the structure of your data.
![](Pasted image 20220622190341.png)
You can add your own content structure by clicking on the `Add` button in the top-right.
You can now type the name, description etc of your content structure.
![](Pasted image 20220622190540.png)
You can add content items using the Add button here
![](Pasted image 20220622190622.png)

You can add different type of items in this list, e.g.:
![](Pasted image 20220622190723.png)

You can also specify the parent of the items, just add a parent item in the list, update the whole document using the `update` button. and then while adding a new item, you can add the parent item using the dropdown in the first column:
![](Pasted image 20220622190908.png)

Once you have added the content structure, note down it's ID, It will be useful for the next steps:
![](Pasted image 20220622191018.png)
**This ID is called topic_group_id in many parts of the kuroco dashboard, and it is required for content API calls.**

## Adding Content

Now that we have added the content structure, we can now add the content itself, to do this, jst click on the content structure in the content tab:
![](Pasted image 20220622191235.png)

You will see an empty list in first, but we will add content and make look like this:
![](Pasted image 20220622191245.png)

To do this, just click on the add button, and add relevent information in the data fields.
![](Pasted image 20220622191403.png)
![](Pasted image 20220622191406.png)
![](Pasted image 20220624095308.png)

You have now added content to your content structure.
These contents also have their own id:
![](Pasted image 20220622191846.png)

#### Data Source:

I am getting recipe data from Luke Smith's amazing cooking website [Based Cooking](https://github.com/LukeSmithxyz/based.cooking)which is an open source minimal cooking website and the inspiration behind this project.

**Remember, content structure is like a blueprint to your actual content. ou can use the content structure id to access the entire list of content under that structure**

![](Pasted image 20220622191941.png)

## Register an API

click on default API and then click on the Add button on the top right to make a new API.
![](Pasted image 20220622192752.png)
![](Pasted image 20220622192837.png)

Enter the relevent details:
![](Pasted image 20220622192936.png)
This will make a new api.
Click on security
![](Pasted image 20220622193010.png)
And set cookies as auth method
![](Pasted image 20220622193036.png)
Open CORS menu
![](Pasted image 20220622193055.png)
And add these details:
![](Pasted image 20220622193231.png)
these values are:
`http://localhost:3000`
`https://YOUR-SITE.g.kuroco-front.app`
Also add GET, POST, and OPTIONS methods in the second field.
**Caution: Do not add forward slash "/" at the end of these URLs.**

## Adding Endpoints

### Main Endpoint

this will give us the list of all recipes (we will need the topic_group_id of our list).
click on `New Endpoint` and fill this info:
![](Pasted image 20220624095016.png)
You will have to fill this id according to your site:
![](Pasted image 20220624095057.png)
You can allow filtering for different columns of the list elements, e.g.
![](Pasted image 20220624095228.png)

### Recipe Details

Add another endpoint to for getting the details of a single recipe:
![](Pasted image 20220624104929.png)
![](Pasted image 20220624104932.png)
These APIs will give us all the required data.

### Current API Response (changed, requires edit)

topic_group_id = 10
topic ids = 8,9,10

```json
{
  "errors": [],
  "messages": [],
  "details": {
    "topics_id": 9,
    "ymd": "2022-06-11",
    "contents_type": 18,
    "subject": "Dish 2",
    "topics_flg": 1,
    "open_flg": 1,
    "regular_flg": 0,
    "inst_ymdhi": "2022-06-11T18:13:02+09:00",
    "update_ymdhi": "2022-06-11T18:13:02+09:00",
    "topics_group_id": 10,
    "slug": "",
    "order_no": 0,
    "group_nm": "recipe",
    "contents_type_cnt": 1,
    "group_description": "cooking recipe",
    "group_ext_data": null,
    "contents_type_nm": "recipe",
    "contents_type_parent_nm": null,
    "category_parent_id": null,
    "contents_type_ext_col_01": null,
    "contents_type_ext_col_02": null,
    "contents_type_ext_col_03": null,
    "contents_type_ext_col_04": null,
    "contents_type_ext_col_05": null,
    "contents_type_list": [18],
    "mainContent": "...",
    "description": "...",
    "tag": ["30 minutes", "Hard Difficulty"],
    "dishImage": {
      "id": "9_ext_04_0",
      "url": "https://sample-jassi.g.kuroco-img.app/v=1654938782/files/topics/9_ext_4_0.jpg",
      "desc": "",
      "url_org": "https://sample-jassi.g.kuroco-img.app/files/topics/9_ext_4_0.jpg"
    }
  }
}
```

After some tweeks I finally got this type of response:

```JSON
{
	...
	"list": [
		{first recipe},
		{second recipe},
		{third recipe},
		...
	],
	"pageInfo": {
	    "totalCnt": 3,
	    "perPage": 20,
	    "totalPageCnt": 1,
	    "pageNo": 1,
	    "firstIndex": 1,
	    "lastIndex": 3,
	    "path": "/rcms-api/5/all-dishes",
	    "param": "?data_format=json",
	    "startPageNo": 1,
	    "endPageNo": 1
	  }
}
```

### What if there are too many entries in the response?

This is the answer:
![](Pasted image 20220620005038.png)
You just have to use pagination, set the number of resukts per page, and you now get responses based on the given page number.

### Problem With Splitting Response into Pages

**problem:**
If I split every 12 results, what are the chances that I will get 3 top recipes in those 12 results?
**Solution:**
search for different categories seperately. This way, we can have different recipe lists for top and other recipes.

## Building Home UI with the API Responses

Now that we have the APIs, we can start building the homepage.
First we will have to fetch and store the data.
recipe lists:

```js
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      dishes: [],
      topDishes: [],
      searchResult: {},
  ...
```

main fetch function

```js
async fetch() {
    await this.getDishes();
    return;
  },
```

Now, we will fetch results based on different conditions:

```js
async getDishes() {
      if (this.category === "") {
        let lol;
        [lol, this.topDishes] = await Promise.all([
          this.getAllDishes(),
          this.getDishesByCategory("top"),
        ]);
      } else {
        [this.dishes, this.topDishes] = await Promise.all([
          this.getDishesByCategory(),
          this.getDishesByCategory("top"),
        ]);
      }
    },
```

**Parallel fetching:**
we can fetch parallely using
`[data1, data2] = await Promise.all([task1(), task2()])`
syntax.

This is the `getAllDishes` function:

```js
async getAllDishes() {
  try {
	let tempQuery = "";
	if (this.searchInput !== "") {
	  tempQuery = `title icontains "${this.searchInput}" OR
				description icontains "${this.searchInput}" OR
				aditionalTags icontains "${this.searchInput}" AND `;
	}
	const response = await axios.get(process.env.BASE_URL + "dish", {
	  params: {
		// filter by keyword is not working in kuroco, doing it the simple way
		filter: `${tempQuery}timeInMinutes <= ${this.cookTime} AND difficulty <= "${this.difficulty}"`,
		pageID: this.currentPage,
	  },
	  headers: {
		"X-RCMS-API-ACCESS-TOKEN": process.env.ACCESS_TOKEN,
	  },
	});
	// null safety
	if (!this.dishes) {
	  this.dishes = [];
	}
	this.dishes = response.data.list;
	// update the total number of pages in page navigation UI
	this.totalPages = response.data.pageInfo.totalPageCnt;
  } catch (e) {
	console.log(e.message);
  }
  return;
},
```

Some other functions are used as well but theyy all share the same flow.

we can set categories by setting a category variable and using a category dictionary.

```json
category: ""
category_dict: {
	all: 0,
	indian: 26,
	japanese: 27,
	english: 28,
	french: 29,
	mexican: 34,
},
```

**We need a category dictionary because we cannot search using category name in Kuroco (yet)**
now we can set dfferent categories using this element:

```html
<div class="categories">
  <div
    v-for="(id, cat) in category_dict"
    class="category"
    @click="setCategory(cat)"
    :style="getCategoryStyle(cat)"
  >
    {{ cat }}
  </div>
</div>
```

Helper Functions:

```js
async setCategory(category) {
    if (category === "all") {
	    this.category = "";
    } else {
	    this.category = category;
    }
    await this.reset();
},
```

```js
getCategoryStyle(category) {
      if (category === "all" && this.category === "") {
        return `transform: translate(0px, -3px);
		        box-shadow: 0px 0px 6px rgba(0,0,0,0.15);
		        background-color: #defcfc;`;
      } else if (category === this.category) {
        return `transform: translate(0px, -3px);
		        box-shadow: 0px 0px 6px rgba(0,0,0,0.15);
		        background-color: #defcfc;`;
      } else {
        return "";
      }
    },
```

This is how it looks:
![](Pasted image 20220624113014.png)

## Adding Filters, Categories in Home Page

### Getting top Dishes:

Add `top` tag to them and filter by tag id:
![](Pasted image 20220624074549.png)
![](Pasted image 20220624074551.png)
![](Pasted image 20220624074556.png)

### Search By Category:

Follow the same procedure, give thr recipe a category and filter by it's id
![](Pasted image 20220624075555.png)

### Filter By Recipe Time

Add a range input, and bind it with a data (`cookTime`) with v-model:

```js
<input
	v-model.lazy="cookTime"
	type="range"
	id="points"
	name="points"
	min="0"
	max="240"
	step="15"
	@change="getDishes"
/>
```

now we can search through all dishes with an additional filter:

```json
filter: `timeInMinutes <= ${cookTime}`
```

### Filter By Difficulty

same steps, just add a difficulty dictionary for key-value convertion (we can't search by values in kuroco, only by keys)

```js
difficultyDict: {
        1: "Easy",
        2: "Medium",
        3: "Hard",
},
```

## Styling

```CSS
display: flex;
```

was really helpful.
**[Everything you need to know to get started with flexbox can be found Here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)**

using:

```CSS
position: absolute;
```

made it possible to keep the search fixed elements in their place. You can also overlap elements using this.

Keep the NavBar z index high to prevent elements peeking through it at some time.
![](Pasted image 20220622180048.png)

To keep the footer at the bottom, you can use `position: absolute`
![](Pasted image 20220622180215.png)
But to activate it, you need the set `position: relative` to the parent element. **important**
![](Pasted image 20220622180314.png)

### Adding Global CSS Colors:

```
npm install --save-dev @nuxtjs/style-resources
```

```js
export default {
  //...
  css: ["~assets/scss/colors.scss"],
  //...
  modules: ["@nuxtjs/style-resources"],

  //You will have to add this new object if it doesn't exist already
  styleResources: {
    scss: ["./assets/scss/*.scss"],
  },
  //...
};
```

now you can have a global scss file that contains your global css variables.
![](Pasted image 20220624092751.png)
![](Pasted image 20220624092822.png)

### Problem: Textarea At 100% Width Overflows Parent Container

**Solution:** Add `box-sizing: border-box;` to the `textarea`, i.e:

```css
form textarea {
  width: 100%;
  box-sizing: border-box;
  height: 500px;
}
```

## Image Processing Using Kuroco

We should optimize ever image asset that you are using for the website to keep it fast and responsive. To do this, we can get help from the built-in Image processing functionalities of Kuroco.
I found this guide to prrocess images dynamically using kuroco
https://kuroco.app/docs/reference/api-convert-image/
Now I can fetch images of only required size, change aspect ratio beforehand, and even change image format.

#### Problem:

using `?width=300&height=200&fit=cover` querry doesn't work because `fit` query overwrites the width and height.

#### Current solution:

only use height and fit.

## Adding Recipe Submission Form

Setup the API endpoint:
![](Pasted image 20220623013204.png)

For this, only addtional thing we have to do is to have a file upload endpoint as well.
For that, configure the endpoint like below:
![](Pasted image 20220623013311.png)

I was giving me `forbidden` error, so I had to enable `dynamic token` authentication for APIs and get a dynamic access token through smarty. After that I added it as a header like this:

```js
process.env.BASE_URL + "file",
  fm,
  {
    headers: {
      "Content-Type": "multipart/form-data", //required to post file as a binary
      "X-RCMS-API-ACCESS-TOKEN":
        "3d4738ee303bbdd75f6c4dfc1e5c69587b6ca1de5f850cc8158e3fb83762853d",
    },
  };
```

After testing, I changed it with an environment variable for securit reasons.
![](Pasted image 20220624092945.png)

```json
headers: {
	"X-RCMS-API-ACCESS-TOKEN": process.env.ACCESS_TOKEN,
},
```

### Adding a WYSIWYG Editor

For this, I used tiptap editor package for Nuxtjs.

#### 1. Install the dependencies

you’ll need the `@tiptap/vue-2` package, with a few components, and `@tiptap/starter-kit` which has the most common extensions to get started quickly.

```
npm install @tiptap/vue-2 @tiptap/starter-kit
```

#### 2. Create a new component

To actually start using Tiptap, you’ll need to add a new component to your app. Let’s call it `TiptapEditor` and put the following example code in `components/TiptapEditor.vue`.

```js
<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    }
  },

  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
```

#### 3. Add it to your app

replace the content of `pages/index.vue` with the following example code to use our new `TiptapEditor` component in our app.

```js
<template>
  <div>
    <client-only>
      <tiptap-editor />
    </client-only>
  </div>
</template>
<script>
import TiptapEditor from '~/components/TiptapEditor.vue'
export default {
  components: {
    TiptapEditor
  }
}
</script>
```

You should now see Tiptap in your browser.
If yyou want to use `v-model` with it, you can make a few changes in the editor to support it.
After the changes it will look like this:

```js
<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [StarterKit],
      onUpdate: () => {
        // HTML
        this.$emit("input", this.editor.getHTML());
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
```

Now you would be able to use `v-model` with the editor.

### Using v-model to set recipe data

we can use v-model to connect the form inputs and our data variables. Let's sa ouur form data is this:

```json
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
```

Now we can update it's values using v-model, i.e:

```html
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
```

We can add array of data into the form using something like this:

```html
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
```

Function to change number of inputs:

```js
changeTag(mode) {
      if (mode === "+" && this.num_tags < 8) {
        this.form.aditionalTags.push("");
        this.num_tags++;
      } else if (mode === "-" && this.num_tags > 1) {
        this.num_tags--;
        this.form.aditionalTags.pop();
      }
    },
```

Finally we can submit using the function:

```js
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
      // API only accepts int as timeInMinutes is set to INT datatype
      this.form.timeInMinutes = parseInt(this.form.timeInMinutes);

      try {
        // post data to Kuroco
        const { id } = await this.$axios.$post(
          process.env.BASE_URL + `dish/create`,
          this.form,
          {
            headers: {
              "X-RCMS-API-ACCESS-TOKEN": process.env.ACCESS_TOKEN,
            },
          }
        );
        this.error = null;
        this.submittedId = id;
        this.submitted = true;
      } catch (e) {
        this.error = [`${e}`, ...e.response.data.errors];
      }
    },
```

### Problem: My Buttons Were Refreshing the Form Page

**Solution:**  
You should add `type="button"` to your `<button>`.

If you don't specify a `type` of a `<button>` in a `<form>`, it will behave like a submit button by default, which refreshes the page.

## Other Common Problems

### Why was I getting undefined in place of my baseUrl

I didn't follow these steps:

#### Install dotenv

Execute the following command in the Nuxt.js installation directory to install dotenv.

```
npm install @nuxtjs/dotenv
```

#### [](https://kuroco.app/docs/tutorials/integrate-kuroco-with-nuxt/#adding-dotenv-to-nuxtconfigjs)Adding dotenv to nuxt.config.js

Add the following to nuxt.config.js.
nuxt.config.js

```
require('dotenv').config();
const { BASE_URL } = process.env;
```

Also, add the following in `module.exports`.
nuxt.config.js

```
  env: {
    BASE_URL
  }
```

To be fair, these steps were not mentioned in the beginner's guide. These were mentioned in the `tutorial/front end` section

**After following these:**
It worked! I don't have to use `if(!env.BASE_URL)` safeguards anymore.

### Form not getting accepted

This problem occured when I was using kuroco forms, I am no longer using kuroco forms but it's still helpful to keep the solution here.
The forms were not getting accepted, the API was returning NetworkError.
**Solution:**  
I had to keep the names of the two endpoints same, just like this:
![](Pasted image 20220620015047.png)
Initialy I had named them /get-form and /add-dish. Maybe that's why it was not taking submissions.

### NetworkError when attempting to fetch

Whenever swagger UI show you this error, most likely ou will need to enable some authentication for the API and then request using auth tokens.
![](Pasted image 20220620003219.png)

## Problems That Are Yet to Be Resolved

### Post, Login, Update Problem

whenever I am submitting a form or trying to login through the api, it gives me this error:
![](Pasted image 20220620003219.png)

#### Another Reference for this error (Now Solved)

I was following keyword search and I got stuck in a step
![](Pasted image 20220620011956.png)
I am getting this error
![](Pasted image 20220620012020.png)

### Middleware

unknown middleware: auth;
It's not showing this error anymore but now it's freezing the entire web app

# References

### Links That Helped

https://github.com/LukeSmithxyz/based.cooking

https://dev.to/paramo/using-sass-global-variables-in-nuxt-js-j0k

## Scribble Area

![](Pasted image 20220623044435.png)
![](Pasted image 20220623044445.png)

Filtering by contents type.
e.g. content type for `mexican category` is 34.
![](Pasted image 20220623203914.png)
**Problem:** this is not working. seems like we can't use this column in filtering.

# Graveyard

# Initial Design phase

**This was my initial plan for the project, It has been changed dramatically but it shows my initial thaought process so I am leaving it here. Start from Current Design**

## First Design

![](Pasted image 20220622183403.png)
![](Pasted image 20220622183406.png)

## API endpoints and Routes

1. /all-recipes: provide all recipes
2. /top-picks: provide top 3 recommended dishes
3. /recipe/id: provide the main content of a specific recipe (I may merge it with all-recipes because it only provides one extra data)

recipee datastructure that was proposed suring project planning:

```JSON
{
	'id': 'recipe id'
	'image': 'recipe image link',
	'title': 'recipe title',
	'timeRequired': 'time neede to follow the recipe in seconds',
	'difficulty': 'recipe difficulty',
	'description': 'a short recipe description',
	'mainContent': 'main content of the recipe itself'
}
```

## Current Data Structure (Now Not Used)

It's a relational database.
![](Pasted image 20220621225043.png)

**ScreenShots of relational Data Categories and Fields:**
![](Pasted image 20220622171155.png)

![](Pasted image 20220622171055.png)
![](Pasted image 20220622171058.png)

### Using post processing to give only requierd data in responce

I am only giving `ext_1` column in the response which only contains recipe id in main databse. To do this just add `list.ext_1` variable in the Post Processing Whitelist of the API enndpoint.
![](Pasted image 20220623013037.png)

### Splitting All dishes into different Categories

I am storing the recipes in different topic groups. These groups will contain recipes as relational data. It will prevent extra data storage and the data will be easier to handle due to a single repository.

Then if I need to display one category, I will call the api (e.g. `get-indian` api ), which wil give me this type of response:

```json
{
  "list": [
    {
      "ext_1": {
        "module_id": 11,
        "module_type": "topics"
      }
    }
  ]
}
```

now I will store all the `module_id` in an array and wil fire up the `all-dishes` api.
~~While calling the api, I will also apply this API filter
`id in array_containing_module_id`
This will return the dishes which have the id in the given array.~~
I found out about a better approach:
![](Pasted image 20220622025234.png)
I only have to pass the id and it will give me the required data.
