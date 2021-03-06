import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

const CONTRACT_ADDRESS = "0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A"
const CONTRACT_API =
  "https://api.infura.io/v1/jsonrpc/rinkeby/eth_call?params=%5B%7B%0D%0A%09%09%22to%22%3A%20%220x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A%22%2C%0D%0A%09%09%22data%22%3A%20%220x6d4ce63c%22%0D%0A%09%7D%2C%0D%0A%09%22latest%22%0D%0A%5D"

// Emergency solution!
// const FALLBACK_ROOTHASH = "QmUffB9SRs6oBSK1YJCT3Y85CHmyUgGQF9JS6Z5rM4xKjS"
// const FALLBACK_ROOTHASH = "QmZ8NNVaYoBpe5xMC6pScUX9t6aWRaspj1TbronnQqLAPF"
// const FALLBACK_ROOTHASH = "QmeTaFxDdbqUo1wq7jJcv5JUL91UK2fgMVH8WDPobuPU7g"
const FALLBACK_ROOTHASH = "QmVSpjZf9ZqnQUvjyFWpScE4ExxnvxKtd2cLWhXeFsfZ9A"

const hexToString = hex => {
  let string = "";
  for (var i = 0; i < hex.length; i += 2) {
    string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return string;
};

const getRootHash = () => {
  return new Promise((resolve, reject) => {
    // Emergency solution!
    resolve(FALLBACK_ROOTHASH)
    Vue.http.get(CONTRACT_API).then(
      response => {
        let convertedHash = hexToString(response.body.result).slice(-64);
        resolve(convertedHash);
      },
      response => {
        reject(response);
      }
    )
  })
}

const callIPFS = rootHash => {
  
  // !!! Temporary fixed root hash
  rootHash = FALLBACK_ROOTHASH
  
  return new Promise((resolve, reject) => {
    const URL = "https://cloudflare-ipfs.com/ipfs/" + String(rootHash);

    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve({
          rootHash: rootHash.replace(/\u0000/g, ""),
          container: json
        })
      })
      .catch(ex => {
        console.log("parsing failed", ex);
        reject(ex);
      })
  })
}

export default {
  getContainer() {
    return new Promise((resolve, reject) => {
      getRootHash(CONTRACT_ADDRESS)
        .then(callIPFS)
        .then(resolve)
        .catch(reject);
    })
  },
  getExhibition(hash) {
    return new Promise((resolve, reject) => {
      const URL = "https://cloudflare-ipfs.com/ipfs/" + String(hash);

      fetch(URL)
        .then(response => {
          return response.json();
        })
        .then(json => {
          if (json.hash) {
            json.hash = hash;
            resolve(json);
          }
        })
        .catch(ex => {
          console.log("parsing failed", ex);
          reject(ex);
        })
    })
  }
}
