# Kétautomatique API

This is an API for the [Kétautomatique chrome extension](https://github.com/fsiguret/ketautomatique). She gets the info's from [node-binance-api](https://github.com/jaggedsoft/node-binance-api) and communicate 
with a [mongoDB Atlas cluster](https://www.mongodb.com/basics/clusters). 

# Setup

```shell
git init
git clone https://github.com/jaggedsoft/node-binance-api.git
npm install
```


After that, you need to create a file named .env in the root folder. This file must contain ACCESS_MONGODB_CONNECT, 
SECRET_API_KEY and API_KEY

example: 
```dotenv
ACCESS_MONGODB_CONNECT = 'mongodb+srv://<user>:<password>@cluster0.c2i98.mongodb.net/<myFirstDatabase>?retryWrites=true&w=majority'

SECRET_API_KEY = "98e58a035709728d4670b6548864123a201c4cc7c42592f4e0183e37997e7a25e"

API_KEY = "8fab9b3b766d5481152f8615485e2fda3eeb30121066940e489268b5d19d7d5"
```

And to finish the installation, run the following command:

```shell
npm run start
```

If all good the console must return to you : 

````shell
Listening on port 3000
Connexion à MongoDB réussie !
````

-----------------

# API Routes

### ORDERS routes

With this API you can get all your orders in your Future Binance account and save him to a mongoDB Atlas cluster.
For doing this, call the following route.

````http request
POST localhost:3000/api/order/add
````
This call can be a little longer, I'm actually working on it.

Response:
```JSON
{
    "message": "Orders has been saved"
}
```

You can get your orders in your mongoDB Atlas Cluster by this route:

````http request
GET localhost:3000/api/order/
````

Response: 

```JSON
{
    "orders": [
      {
        "_id": "61f004ea9ea40b74dc86d35c",
        "buyer": true,
        "commission": 0.32858125,
        "commissionAsset": "USDT",
        "id": 13577887156422,
        "maker": false,
        "orderId": 838974564656465514123954000,
        "price": 3147.33,
        "qty": 0.261,
        "quoteQty": 821.45313,
        "realizedPnl": 0,
        "side": "BUY",
        "positionSide": "BOTH",
        "symbol": "ETHUSDT",
        "time": 1642605354348,
        "__v": 0
      }
    ]
}
```

------------------------

### USERS routes

You can get the user's account information with the following route:

````http request
GET localhost:3000/api/account/
````

Response: 
````JSON
{
    "feeTier": 0,
    "canTrade": true,
    "canDeposit": true,
    "canWithdraw": true,
    "updateTime": 0,
    "totalInitialMargin": "0.00000000",
    "totalMaintMargin": "0.00000000",
    "totalWalletBalance": "0.00000000",
    "totalUnrealizedProfit": "0.00000000",
    "totalMarginBalance": "0.00000000",
    "totalPositionInitialMargin": "0.00000000",
    "totalOpenOrderInitialMargin": "0.00000000",
    "totalCrossWalletBalance": "0.00000000",
    "totalCrossUnPnl": "0.00000000",
    "availableBalance": "0.00000000",
    "maxWithdrawAmount": "0.00000000",
    "assets": [
        {
            "asset": "BTC",
            "walletBalance": "0.00000000",
            "unrealizedProfit": "0.00000000",
            "marginBalance": "0.00000000",
            "maintMargin": "0.00000000",
            "initialMargin": "0.00000000",
            "positionInitialMargin": "0.00000000",
            "openOrderInitialMargin": "0.00000000",
            "maxWithdrawAmount": "0.00000000",
            "crossWalletBalance": "0.00000000",
            "crossUnPnl": "0.00000000",
            "availableBalance": "0.00000000",
            "marginAvailable": true,
            "updateTime": 0
        },
        {
            "asset": "USDT",
            "walletBalance": "0.00000000",
            "unrealizedProfit": "0.00000000",
            "marginBalance": "0.00000000",
            "maintMargin": "0.00000000",
            "initialMargin": "0.00000000",
            "positionInitialMargin": "0.00000000",
            "openOrderInitialMargin": "0.00000000",
            "maxWithdrawAmount": "0.00000000",
            "crossWalletBalance": "0.00000000",
            "crossUnPnl": "0.00000000",
            "availableBalance": "0.00000000",
            "marginAvailable": true,
            "updateTime": 0
        },
        //REST OF THE SYMBOLS
    ],
    "positions": []
}
````
-------------------------

# Troubleshooting

If the API can't get the orders or return the user's account information, you need to sync your computer clock with internet.

How you do that ?

#### Windows 10

Control panel > Date and hour > internet time > modify parameters

Set the Serveur on time.nist.gov and tick the checkbox. Click on update and ok.

Now your time is sync with Internet and you should be able to take your data.