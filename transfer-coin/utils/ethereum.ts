import Web3 from 'web3';

// Check for MetaMask wallet browser extension
function hasEthereum () {
  return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined'
}

// Request wallet account
async function requestAccount() {
  if ((window as any).ethereum) {
    await (window as any).ethereum.request({method: 'eth_requestAccounts'});
    (window as any).web3 = new Web3((window as any).ethereum);
    return true;
  }
}

export { hasEthereum, requestAccount }
