import ipfs from '../../service/ipfs'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  rootHash: 'Loading root hash...',
  container: {
    exhibitions: [
      {
        works: [
          {
            content: []
          }
        ]
      }
    ]
  },
  userList: [],
  currentSlide: '',
  currentSingle: 'kkkkk'
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
  }
}

export default {
  state,
  actions,
  mutations
}
