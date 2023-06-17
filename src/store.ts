import { createStore } from 'vuex'

const state = {
    systemInfo: {},
    windowWidth: 375,
    windowHeight: 667,
    selected: 0,
    gameState: 0, // 0,待开始 1,进行中 2,结束
    score: 0,
}

const mutations = {
    SET_SELECTED(state, payload) {
        state.selected = payload
    },
    SET_GAME_STATE(state, payload) {
        state.gameState = payload
    },
    SET_SYSTEM_INFO(state, payload) {
        state.systemInfo = payload
    },
    SET_WINDOW_WIDTH(state, payload) {
        state.windowWidth = payload
    },
    SET_WINDOW_HEIGHT(state, payload) {
        state.windowHeight = payload
    },
    SET_SCORE(state, payload) {
        state.score = payload
    }
}

const actions = {
    setSelected(context, index) {
        context.commit('SET_SELECTED', index)
    },
    setGameState(context, state) {
        context.commit('SET_GAME_STATE', state)
    },
    setSystemInfo(context, state) {
        context.commit('SET_SYSTEM_INFO', state)
    },
    setWindowWidth(context, state) {
        context.commit('SET_WINDOW_WIDTH', state)
    },
    setWindowHeight(context, state) {
        context.commit('SET_WINDOW_HEIGHT', state)
    },
    setScore(context, state) {
        context.commit('SET_SCORE', state)
    },
}

const getters = {
    getSelected(state) {
        return state.selected
    },
    getGameState(state) {
        return state.gameState
    },
    getSystemInfo(state) {
        return state.systemInfo
    },
    getWindowWidth(state) {
        return state.windowWidth
    },
    getWindowHeight(state) {
        return state.windowHeight
    },
    getScore(state) {
        return state.score
    }


}

const store = createStore({
    state,
    mutations,
    actions,
    getters
})

export default store