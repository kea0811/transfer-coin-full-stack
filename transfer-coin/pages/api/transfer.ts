import type { NextApiRequest, NextApiResponse } from 'next'

import Web3 from 'web3';
import axios from 'axios';

const ethNetwork = process.env.NEXT_PUBLIC_INFURA_ENDPOINT || '';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

type Data = {
  status: string,
  result?: any,
  message?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { receiver, amount } = req.body || {}

  const value = web3.utils.toWei(amount.toString(), 'ether');

  const gasPrices = await getCurrentGasPrices();

  const signTrans = await web3.eth.accounts.signTransaction({
    to: receiver,
    value: value,
    gas: gasPrices.low * 100000
  }, process.env.NEXT_PUBLIC_PRIVATE_KEY || '');

  try {
    const receipt = await web3.eth.sendSignedTransaction(signTrans.rawTransaction || '')
    res.status(200).json({ status: 'success', result: receipt })
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message })
  }
}

const getCurrentGasPrices = async () => {
  let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  };
  return prices;
}
