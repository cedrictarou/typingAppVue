const state = {
  timeLimit: 10000,
  bonusTime: 2000,
};
const getters = {
  timeLimit: (state) => state.timeLimit,
  bonusTime: (state) => state.bonusTime,
};
const mutations = {
  updateTimeLimit(state, newValue) {
    state.timeLimit = newValue;
  },
  updateBonusTime(state, newValue) {
    state.bonusTime = newValue;
  },
};
const actions = {
  updateTimeLimit({ commit }, newValue) {
    commit("updateTimeLimit", newValue);
  },
  updateBonusTime({ commit }, newValue) {
    commit("updateBonusTime", newValue);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
