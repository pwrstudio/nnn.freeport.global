import ipfs from "../../service/ipfs";
import * as actionTypes from "../actionTypes";
import * as mutationTypes from "../mutationTypes";

const state = {
  rootHash: "Loading root hash...",
  exhibitions: [],
  container: {
    about: {},
    exhibitions: [
      {
        works: [
          {
            content: []
          }
        ]
      }
    ],
    works: [],
    content: []
  },
  userList: [],
  currentSlide: "",
  currentWork: {},
  log: [],
  chat: {
    active: false
  },
  mobile: {
    check: false,
    os: ""
  }
};

const actions = {
  async [actionTypes.GET_CONTAINER]({ commit }) {
    commit(mutationTypes.SET_CONTAINER, await ipfs.getContainer());
  },
  async [actionTypes.GET_EXHIBITION]({ commit }, hash) {
    commit(mutationTypes.SET_EXHIBITION, await ipfs.getExhibition(hash));
  },
  [actionTypes.UPDATE_USERLIST]({ commit }, data) {
    commit(mutationTypes.SET_USERLIST, data);
  },
  [actionTypes.SET_CURRENT_SLIDE]({ commit }, data) {
    commit(mutationTypes.SET_CURRENT_SLIDE, data);
  },
  [actionTypes.SET_CURRENT_WORK]({ commit }, data) {
    commit(mutationTypes.SET_CURRENT_WORK, data);
  },
  [actionTypes.UPDATE_WORK]({ commit }, data) {
    commit(mutationTypes.UPDATE_WORK, data);
  },
  [actionTypes.WRITE_LOG]({ commit }, data) {
    commit(mutationTypes.WRITE_LOG, data);
  },
  [actionTypes.TOGGLE_CHAT]({ commit }) {
    commit(mutationTypes.TOGGLE_CHAT);
  },
  [actionTypes.CHECK_MOBILE]({ commit }, data) {
    commit(mutationTypes.CHECK_MOBILE, data);
  }
};

const mutations = {
  [mutationTypes.SET_CONTAINER](state, data) {
    state.rootHash = data.rootHash;
    state.container = data.container;
    state.container.works.sort((a, b) => {
      if (a.hash < b.hash) {
        return -1;
      }
      if (a.hash > b.hash) {
        return 1;
      }
      return 0;
    });
  },
  [mutationTypes.SET_USERLIST](state, data) {
    state.userList = data;
  },
  [mutationTypes.SET_CURRENT_SLIDE](state, data) {
    state.currentSlide = data;
  },
  [mutationTypes.SET_CURRENT_WORK](state, data) {
    state.currentWork = data;
  },
  [mutationTypes.SET_EXHIBITION](state, data) {
    state.exhibitions.push(data);
  },
  [mutationTypes.UPDATE_WORK](state, data) {
    // TODO: nicer solution....
    state.container.works.forEach((w, i) => {
      if (w.hash === data.hash) {
        state.container.works[i] = data;
      }
    });
  },
  [mutationTypes.WRITE_LOG](state, data) {
    if (state.log.length > 500) {
      state.log.splice(-1, 200);
    }
    state.log.unshift(data);
  },
  [mutationTypes.TOGGLE_CHAT](state) {
    state.chat.active = !state.chat.active;
  },
  [mutationTypes.CHECK_MOBILE](state, data) {
    state.mobile.check = true;
    state.mobile.os = data;
  }
};

export default {
  state,
  actions,
  mutations
};
