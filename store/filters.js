export const filters = () => ({
    cookTime: 240,
    searchInput: '',
    category: '',
    difficulty: 3,
})

export const getters = {
    cookTime (state) {
        return state.cookTime
    },
    searchInput (state) {
        return state.searchInput
    },
    category (state) {
        return state.category
    },
    difficulty (state) {
        return state.difficulty
    },
    all(state) {
        return {
            cookTime: state.cookTime,
            searchInput: state.searchInput,
            category: state.category,
            difficulty: state.difficulty,
        }
    }
}

export const mutations = {
    setCookTime (state, { cookTime }) {
        state = { ...state, cookTime }
    },
    setSearchInput (state, { searchInput }) {
        state = { ...state, searchInput }
    },
    setCategory (state, { category }) {
        state = { ...state, category }
    },
    setDifficulty (state, { difficulty }) {
        state = { ...state, difficulty }
    },
    setAll (state, { cookTime, searchInput, category, difficulty }) {
        state = { ...state, cookTime, searchInput, category, difficulty }
    }
}