import { createStore } from 'vuex'
import { getStorageSync } from "./utils/storage";

const state = {
    freeEmoj: getStorageSync('freeEmoj', ''),
    systemInfo: {},
    windowWidth: 375,
    windowHeight: 667,
    selected: 0,
    tabSelected: 'a', // a: /pages/index/index , b: /pages/media/index
    gameState: 0, // 0,待开始 1,进行中 2,结束
    score: 0,
}

const mutations = {
    SET_FREE_EMOJ(state, payload) {
        state.freeEmoj = payload
    },
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
    },
    SET_TAB_SELECTED(state, payload) {
        state.tabSelected = payload
    }
}

const actions = {
    setFreeEmoj(context, state) {
        context.commit('SET_FREE_EMOJ', state)
    },
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
    setTabSelected(context, state) {
        context.commit('SET_TAB_SELECTED', state)
    }
}

const getters = {
    getFreeEmoj(state) {
        return state.freeEmoj
    },
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
    },
    getTabSelected(state) {
        return state.tabSelected
    }
}

const store = createStore({
    state,
    mutations,
    actions,
    getters
})

export default store