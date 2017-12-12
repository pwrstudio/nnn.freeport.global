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
  }
}

const actions = {
  async [actionTypes.GET_CONTAINER]({commit, state}) {
    commit(mutationTypes.SET_CONTAINER, await ipfs.getContainer())
  }
}

const mutations = {
  [mutationTypes.SET_CONTAINER](state, data) {
    state.rootHash = data.rootHash
    state.container = data.container
  }
}

export default {
  state,
  actions,
  mutations
}
