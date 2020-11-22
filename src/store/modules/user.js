import axiosUser from "../../axios/axios-user.js";

const state = {
  currentUser: {
    id: null,
    email: null,
  },
  users: [],
};
const getters = {
  currentUser: (state) => state.currentUser,
  users: (state) => state.users,
};
const mutations = {
  updateUser(state, newUser) {
    state.currentUser = newUser;
  },
  getAllUsers(state, users) {
    state.users = users;
  },
};
const actions = {
  async getUserData({ commit }, idToken) {
    await axiosUser
      .post("/accounts:lookup?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM", {
        idToken: idToken,
      })
      .then((res) => {
        const userData = {
          id: res.data.users[0].localId,
          email: res.data.users[0].email,
        };
        // console.log(res);
        commit("updateUser", userData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getAllUsers({ commit }, idToken) {
    await axiosUser
      .post("/accounts:lookup?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM", {
        idToken: idToken,
      })
      .then((res) => {
        const users = res;
        console.log(users);
        commit("getAllUsers", users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
