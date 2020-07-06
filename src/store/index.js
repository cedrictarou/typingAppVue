import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from '../axios/axios-auth';
import axiosRefresh from '../axios/axios-refresh';
import router from '../router/index';
import words from './modules/words';
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null,
    },
    getters: {
        idToken: (state) => state.idToken,
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        },
    },
    actions: {
        async autoLogin({ commit, dispatch }) {
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;
            const now = new Date();
            const expiryTimeMs = localStorage.getItem('expiryTimeMs');
            const refreshToken = localStorage.getItem('refreshToken');
            const isExpired = now.getTime() >= expiryTimeMs;
            if (isExpired) {
                await dispatch('refreshIdToken', refreshToken);
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshIdToken', refreshToken);
                }, expiresInMs);
                commit('updateIdToken', idToken);
            }
        },
        login({ dispatch }, authData) {
            axiosAuth
                .post(
                    '/accounts:signInWithPassword?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM', {
                        email: authData.email,
                        password: authData.password,
                        returnSecureToken: true
                    }
                )
                .then((res) => {
                    dispatch('setAuthData', {
                        idToken: res.data.idToken,
                        expiresIn: res.data.expiresIn,
                        refreshToken: res.data.refreshToken
                    });
                    router.push('/');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimeMs');
            localStorage.removeItem('refreshToken');
            router.replace('/login');
        },
        async refreshIdToken({ dispatch }, refreshToken) {
            await axiosRefresh
                .post('/token?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                .then((res) => {
                    dispatch(' setAuthData', {
                        idToken: res.data.idToken,
                        expiresIn: res.data.expiresIn,
                        refreshToken: res.data.refreshToken
                    });
                });
        },
        register({ dispatch }, authData) {
            axiosAuth
                .post('/accounts:signUp?key=AIzaSyCCthIGG3XeQ-uoM6W0w9Ee1i4cjy6iWUM', {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                .then((res) => {
                    dispatch('setAuthData', {
                        idToken: res.data.id_token,
                        expiresIn: res.data.expires_in,
                        refreshToken: res.data.refresh_token
                    });
                    router.push('/');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        setAuthData({ commit, dispatch }, authData) {
            const now = new Date();
            const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshToken', authData.refreshToken);
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshIdToken);
                this.refreshIdToken();
            }, authData.expiresIn * 1000);
        },

    },
    modules: {
        words,
        user
    }
});