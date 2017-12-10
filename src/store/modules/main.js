import ipfs from '../../service/ipfs'
import * as actionTypes from '../actionTypes'
import * as mutationTypes from '../mutationTypes'

const state = {
  rootHash: 'Loafing root hash...',
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
  singleExhibition: {
    title: '',
    description: '',
    start_date: new Date(),
    end_date: new Date(),
    festival: '',
    venue: '',
    city: '',
    country: '',
    location: {},
    works: []
  },
  singleWork: {
    title: '',
    artists: [],
    publication_time: '', // time
    content: []
  },
  singleContent: {
    type: '',
    hash: ''
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
