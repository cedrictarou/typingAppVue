import axiosUser from '../../axios/axios-user.js';

const state = {
    currentUser: {
        id: null,
        email: null
    }
};
const getters = {
    currentUser: (state) => state.currentUser
};
const mutations = {
    updateUser(state, newUser) {
        state.currentUser = newUser;
    }
};
const actions = {
    async getUserData({ commit }, idToken) {
        // ユーザー情報を取得する
        await axiosUser
            .post('/accounts:lookup?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM', {
                idToken: idToken
            })
            .then((res) => {
                const userData = {
                    id: res.data.users[0].localId,
                    email: res.data.users[0].email
                };
                commit('updateUser', userData);
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
    actions
};