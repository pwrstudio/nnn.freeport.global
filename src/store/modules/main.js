import ipfs from '../../service/ipfs'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  rootHash: 'Loading root hash...',
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
  currentSlide: '',
  currentWork: {},
  log: []
}

const actions = {
  async [actionTypes.GET_CONTAINER]({commit, state}) {
    commit(mutationTypes.SET_CONTAINER, await ipfs.getContainer())
  },
  [actionTypes.UPDATE_USERLIST]({commit, state}, data) {
    commit(mutationTypes.SET_USERLIST, data)
  },
  [actionTypes.SET_CURRENT_SLIDE]({commit, state}, data) {
    commit(mutationTypes.SET_CURRENT_SLIDE, data)
  },
  [actionTypes.SET_CURRENT_WORK]({commit, state}, data) {
    commit(mutationTypes.SET_CURRENT_WORK, data)
  },
  [actionTypes.UPDATE_WORK]({commit, state}, data) {
    commit(mutationTypes.UPDATE_WORK, data)
  },
  [actionTypes.WRITE_LOG]({commit, state}, data) {
    commit(mutationTypes.WRITE_LOG, data)
  }
}

const mutations = {
  [mutationTypes.SET_CONTAINER](state, data) {
    state.rootHash = data.rootHash
    state.container = data.container
  },
  [mutationTypes.SET_USERLIST](state, data) {
    state.userList = data
  },
  [mutationTypes.SET_CURRENT_SLIDE](state, data) {
    state.currentSlide = data
  },
  [mutationTypes.SET_CURRENT_WORK](state, data) {
    state.currentWork = data
  },
  [mutationTypes.UPDATE_WORK](state, data) {
    // TODO: nicer solution....
    state.container.works.forEach((w, i) => {
      if (w.hash === data.hash) {
        state.container.works[i] = data
      }
    })
  },
  [mutationTypes.WRITE_LOG](state, data) {
    if (state.log.length > 500) {
      state.log.splice(-1, 200)
    }
    state.log.unshift(data)
  }
}

export default {
  state,
  actions,
  mutations
}
