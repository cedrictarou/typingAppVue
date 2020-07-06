import axios from 'axios';
const state = {
    words: [],
};
const getters = {
    words: (state) => state.words,
};
const mutations = {
    updateWords(state, newWords) {
        state.words = newWords;
    },
};
const actions = {
    getAllData({ commit, getters }, idToken) {
        // ユーザごとのデータのクエリをポストして、wordsをアップデートする処理
        axios
            .post(
                'projects/typing-app-f08b8/databases/(default)/documents:runQuery', {
                    structuredQuery: {
                        from: [{ collectionId: 'words' }],
                        select: {
                            fields: [{ fieldPath: 'sentence' }]
                        },
                        where: {
                            fieldFilter: {
                                field: { fieldPath: 'userId' },
                                op: 'EQUAL',
                                value: { stringValue: getters.currentUser.id }
                            }
                        }
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            )
            .then((res) => {
                for (let i = 0; i <= res.data.length; i++) {
                    commit('updateWords', res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    async getUserItems({ dispatch }, idToken) {
        // userごとに単語リストを取って来る処理
        await dispatch('getUserData', idToken);
        dispatch('getAllData', idToken);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};