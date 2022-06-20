import axios from 'axios';
import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const coins = [{
  symbol: "eth",
  slug: "ethereum",
  image: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png",
  price: () => Math.floor(Math.random() * (1200 - 1100 + 1100) + 1100)
}, {
  symbol: "doge",
  slug: "dogecoin",
  image: "https://cdn0.iconfinder.com/data/icons/blockchain-classic/256/Dogecoin-1024.png",
  price: () => (Math.random() * (0.08 - 0.04 + 0.04) + 0.04).toFixed(3)
}, {
  symbol: "btc",
  slug: "bitcoin",
  image: "https://cdn1.iconfinder.com/data/icons/social-icons-33/512/bitcoin-1024.png",
  price: () => Math.floor(Math.random() * (23693 - 20693 + 20693) + 20000)
}, {
  symbol: "xrp",
  slug: "xrp",
  price: () => (Math.random() * (0.4 - 0.22 + 0.22) + 0.22).toFixed(3)
}, {
  symbol: "bnb",
  slug: "bnb",
  price: () => Math.floor(Math.random() * (220 - 205 + 205) + 205)
}, {
  symbol: "dot",
  slug: "polkadot",
  image: "https://polkadot.network/content/images/2021/12/ghost_avatar_polkadot.png",
  price: () => (Math.random() * (8.5 - 7 + 7) + 7).toFixed(2)
}];

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/getCoins', (req, res) => {
  setTimeout(async () => {
    let result: any = new Array(8).fill('');

    result = result.map(item => {
      const currentCoinIndex = Math.floor(Math.random() * coins.length);
      const blockNum = Math.floor(Math.random() * (12297500 - 12297400 + 12297400) + 12297400)
      const leaseEnd = Math.floor(Math.random() * (12499100 - 12499000 + 12499000) + 12499000)

      return {
        "id": uuidv4(),
        "blockNumber": blockNum,
        "transactionIndex": 6,
        "sources": [
          0,
          1,
          2,
          3
        ],
        "symbol": coins[currentCoinIndex].symbol,
        "slug": coins[currentCoinIndex].slug,
        "leaseEnd": leaseEnd,
        "subscriptionId": currentCoinIndex,
        "networkId": 0,
        "aggregationStrategy": 1,
        "reportingStrategy": 0,
        "status": Math.floor(Math.random() * (3 - 1 + 1) + 1),
        "client": {
          "clientType": 0,
          "connectionInfo": {
            "contractAddress": "0x0F9dfd6043965B02e74D01188c13936fBE71D688",
            "networkId": 0
          }
        },
        "createdTimestamp": new Date(),
        "updatedTimestamp": new Date(),
        "display": true,
        price:  coins[currentCoinIndex || 0].price(),
        image: coins[currentCoinIndex || 0]?.image || ''
      }
    });

    res.statusCode = 200;
    res.json({
      status: 'success',
      result
    });
  }, 3000)
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});