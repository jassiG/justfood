export const state = () => ({
    profile: null,
    role: null,
})

export const getters = {
    authenticated (state) {
        return state.profile !== null
    },
    profile (state) {
        return state.profile
    },
    role (state) {
        return state.role
    }
}

export const mutations = {
    setProfile (state, { profile }) {
        state.profile = profile
    },
    setRole(state, { role }) {
        state.role = role
    },
    updateLocalStorage (state, payload) {
        Object.entries(payload).forEach(([key, val]) => {
            localStorage.setItem(key, val)
        })
    },
    deleteLocalStorage (state, payload) {
        localStorage.clear();
    },
    setAccessTokenOnRequestHeader (state, { rcmsApiAccessToken }) {
        this.$axios.defaults.headers.common = {
            'X-RCMS-API-ACCESS-TOKEN': rcmsApiAccessToken
        }
    }
}
export const actions = {
    async login ({ commit }, payload) {
        const { grant_token } = await this.$axios.$post(process.env.BASE_URL + 'auth/login', payload)
        const { access_token } = await this.$axios.$post(
            process.env.BASE_URL + 'auth/token',
            { grant_token }
        )
            
        commit('updateLocalStorage', { rcmsApiAccessToken: access_token.value })
        commit('setAccessTokenOnRequestHeader', { rcmsApiAccessToken: access_token.value })
        const profileRes = await this.$axios.$get(process.env.BASE_URL + 'auth/profile')
        commit('setProfile', { profile: profileRes })
        commit('updateLocalStorage', { profile: JSON.stringify(profileRes) })
        for (let role of Object.values(profileRes.group_ids)){
            console.log("local role was: ", role)
            switch (role) {
                case 'Admin':
                    commit('setRole', { role: 'admin' })
                    break;
                case 'Moderator':
                    commit('setRole', { role: 'moderator' })
                    break;
                default :
                    commit('setRole', { role: 'user' })
            }
        }
        // console.log("PROFILE", profileRes)
        // console.log("ROLE", this.state.role)
        this.$router.push('/')
    },
    async logout ({ commit }) {
        try {
            await this.$axios.$post(process.env.BASE_URL + 'auth/logout')
        } catch {
            /** No Process */
            /** When it returns errors, it consider that logout is complete and ignore this process. */
        }
        commit('setProfile', { profile: null })
        commit('updateLocalStorage', { rcmsApiAccessToken: null })
        commit('deleteLocalStorage', {})
        commit('setAccessTokenOnRequestHeader', { rcmsApiAccessToken: null })

        this.$router.push('/')
    },
    async restoreLoginState ({ commit, dispatch }) {
        const rcmsApiAccessToken = localStorage.getItem('rcmsApiAccessToken')
        const authenticated = typeof rcmsApiAccessToken === 'string' && rcmsApiAccessToken.length > 0

        if (!authenticated) {
            await dispatch('logout')
            throw new Error('need to login')
        }
        try {
            commit('setAccessTokenOnRequestHeader', { rcmsApiAccessToken })
            const profileRes = await this.$axios.$get(process.env.BASE_URL + 'auth/profile')
            commit('setProfile', { profile: profileRes.data })
        } catch {
            await dispatch('logout')
            throw new Error('need to login')
        }
    }
}