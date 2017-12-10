import IPFS from 'ipfs-mini'
import Web3 from 'web3'
import isIPFS from 'is-ipfs'
const ipfs = new IPFS({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
})

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: 'x',
        type: 'string'
      }
    ],
    name: 'set',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'get',
    outputs: [
      {
        name: 'x',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]

const CONTRACT_ADDRESS =
  '0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A'

const provider = new Web3.providers.HttpProvider(
  'https://rinkeby.infura.io/35d16cN6cJHiZGlnWfZ2'
)
const web3 = new Web3(provider)

const getRootHash = contractAddress => {
  if (Web3.utils.isAddress(contractAddress)) {
    return new Promise((resolve, reject) => {
      const rootContract = new web3.eth.Contract(
        abi,
        CONTRACT_ADDRESS
      )
      rootContract.methods
        .get()
        .call()
        .then(resolve)
    })
  } else {
    console.error(
      'Invalid contract address: ',
      contractAddress
    )
    return null
  }
}

const callIPFS = rootHash => {
  if (isIPFS.multihash(rootHash)) {
    return new Promise((resolve, reject) => {
      ipfs.catJSON(rootHash, (err, result) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve({
          rootHash: rootHash,
          container: result
        })
      })
    })
  } else {
    console.error('Invalid multihash: ', rootHash)
    return null
  }
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
