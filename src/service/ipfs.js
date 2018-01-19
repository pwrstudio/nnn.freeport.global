import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// Vue.http.options.crossOrigin = true
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

const CONTRACT_ADDRESS = '0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A'
// const CONTRACT_API =
//   'https://api.infura.io/v1/jsonrpc/rinkeby/eth_call?params=%5B%7B%0D%0A%09%09%22to%22%3A%20%220x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A%22%2C%0D%0A%09%09%22data%22%3A%20%220x6d4ce63c%22%0D%0A%09%7D%2C%0D%0A%09%22latest%22%0D%0A%5D'

// const FALLBACK_ROOTHASH = 'QmdAfAKQpNK6cGiPT7r6zkx9NYN33mWn3WF8y3Gj4ae6CQ'
// const FALLBACK_ROOTHASH = 'QmNexXTxspjxf7Fx3cXZcVgqwwCde5vhNbnCxwPZ6WUee3'
const FALLBACK_ROOTHASH = 'QmckeTeJNyYidZB3fXCx2ChxLbXAQdmFZi9mojcSjGL6rb'

// const hexToString = hex => {
//   let string = ''
//   for (var i = 0; i < hex.length; i += 2) {
//     string += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
//   }
//   return string
// }

const getRootHash = contractAddress => {
  return new Promise((resolve, reject) => {
    resolve(FALLBACK_ROOTHASH)

    // Vue.http.get(CONTRACT_API).then(
    //   response => {
    //     let convertedHash = hexToString(response.body.result).slice(-64)
    //     console.log(convertedHash)

    //     resolve(convertedHash)
    //   },
    //   response => {
    //     reject(response)
    //   }
    // )
  })
}

const callIPFS = rootHash => {
  return new Promise((resolve, reject) => {
    console.log(rootHash)
    console.log('https://ipfs.io/ipfs/' + rootHash)
    Vue.http.get('https://ipfs.io/ipfs/' + String(rootHash)).then(
      response => {
        resolve({
          rootHash: rootHash,
          container: response.body
        })
      },
      response => {
        reject(response)
      }
    )
  })
}

export default {
  getContainer() {
    return new Promise((resolve, reject) => {
      getRootHash(CONTRACT_ADDRESS)
        .then(callIPFS)
        .then(resolve)
        .catch(reject)
    })
  }
}
