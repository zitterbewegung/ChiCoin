# Becoming C# Bicoin / Blockchain developer

I wanted to establish this repository for my fellow C# developers to speed up their journey when it comes crypto development. When I was starting there were way less resources. Luckily that has changed. Plus, now that we have ChiTown Crypto we can exchange knowledge. Be on a lookout for developer meetups every month: https://www.meetup.com/chicagoblockchainproject/

## Most cryptos are simple state machines

While there is lots of mysticizing when it comes to "coding for blockchain", in the nutshell all that you are doing is changing the state of the system by applying transactions from the block. Ethereum whitepaper has pretty good section titled ["Bitcoin as a State Transition System"](https://github.com/ethereum/wiki/wiki/White-Paper) from which this graphic is:

![Vitalik's 1337 diagram on state transition](https://raw.githubusercontent.com/ethereumbuilders/GitBook/master/en/vitalik-diagrams/statetransition.png)

In Bitcoin "state of the system" is UTXO set, a ledger of "unspent transaction outputs". From graphic we see that:

 1) We have 5 UTXOs. 
 2) Transaction "spends" 2 of those outputs by providing appropriate signatures. 
 3) Amount we have is now distributed in 3 new UTXOs
 4) We now have new state of the system with 6 UTXOs and their appropriate balances

I think example would be better if Vitalik used non-zero values... but I guess he wanted to emphasize that balance of UTXO is not the focus of example. The process of spending through digital signatures is the focus.

## Decentralized consensus without trust

The reason why so many people are mesmerized by Bitcoin is that Satoshi implemented process allowing peer-to-peer network to agree on consensus without nodes trusting each other. Before Bitcoin we would ask - HOW do you get all nodes on network to agree what set of transactions you get to apply in order to go from one state of the system to another? And we wouldn't have good answer to that question... The way this was done is mostly - you create some "central super servers" that everyone trusts and you go from there.

Proof of work allowed decentralized consensus without trust, in essence [solving Byzantine Generals problem](http://satoshi.nakamotoinstitute.org/emails/cryptography/11/). Emulating this approach we are now able to create protocols that given certain set of rules can come to distributed consensus. And that's what's driving all the innovation seen lately.

## Example Bitcoin transaction

To me all became easier when I saw an example Bitcoin transaction in JSON. Here is one:

	{
	  "hash": "0fc964cdedd26f1598503e9a0677cdad304d68de1f64b0e147bd25c7d99fc55e",
	  "ver": 1,
	  "vin_sz": 1,
	  "vout_sz": 1,
	  "lock_time": 0,
	  "size": 192,
	  "in": [
	    {
	      "prev_out": {
	        "hash": "4644a8ac4531aa82c8de5a555d6ba83671b7f696aea01fd91c283e0829a28b1e",
	        "n": 0
	      },
	      "scriptSig": "30450221008214a424a0488f1c9ac32855f6fa40ea3e88e929a774bff064fdffd221cc3b7b02204a8f2330c9ec5f6562bd132bc06bbf0d563343bae5cd1715d8c296ea29c0775e01 031f7fc0b8de7be2c82164b1f9eafa3cd3af78f284ecadabbdf1bc3959d3259c48"
	    }
	  ],
	  "out": [
	    {
	      "value": "1.09000000",
	      "scriptPubKey": "OP_DUP OP_HASH160 b34fad2260a6fb3e8e6390752de4761a98bdcc6f OP_EQUALVERIFY OP_CHECKSIG"
	    }
	  ]
	}

As you can see each Bitcoin transaction has **inputs** and **outputs** (`in` and `out`). **Inputs** SPEND some existing outputs by providing `scriptSig` that satisfies "locking mechanism" provided by `scriptPubKey`. 

In our example, we have 1 input and 1 output. Our input spends first (0) output of some existing transaction whose hash is `4644a8ac4531aa82c8de5a555d6ba83671b7f696aea01fd91c283e0829a28b1e`. This is defined by `prev_out` field. Then we are provide valid unlocking script with `scriptSig`. This is where "crypto" comes into play; in this example we are providing two values that are divided with empty space:

 - `30450221008214a424a0488f1c9ac32855f6fa40ea3e88e929a774bff064fdffd221cc3b7b02204a8f2330c9ec5f6562bd132bc06bbf0d563343bae5cd1715d8c296ea29c0775e01` - ECDSA signature which will unlock referenced UTXO
 - `031f7fc0b8de7be2c82164b1f9eafa3cd3af78f284ecadabbdf1bc3959d3259c48` - corresponding public key used in ECDSA verification

From our previous output we can assume that value of `prev_out` was likely 1.10 BTC (difference of 0.01 BTC will be collected by block miner as mining fee). So now with our output we are assigning 1.09 BTC to new UTXO that is locked with shown `scriptPubKey`.

For start you shouldn't worry too much about `OP_DUP`, `OP_HASH160`... and rest of SCRIPT commands. SCRIPT is likely the most complicated part of Bitcoin. As long as you have basic understanding of what Bitcoin transactions are doing - you are good.

## Block structure

Each block that miners create is basically just a collection of transactions we previously examined. Let's go with JSON, shall we:

	{
	  "hash":"00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee",
	  "ver":1,
	  "prev_block":"000000002a22cfee1f2c846adbd12b3e183d4f97683f85dad08a79780a84bd55",
	  "mrkl_root":"7dac2c5666815c17a3b36427de37bb9d2e2c5ccec3f8633eb91a4205cb4c10ff",
	  "time":1231731025,
	  "bits":486604799,
	  "nonce":1889418792,
	  "n_tx":2,
	  "size":490,
	  "tx":[
	    { /* txn 1 */ },
	    { /* txn 2 */ },
	    // you get the idea, right?
	    { /* txn n */ }
	  ]
	}

To start with `hash` field: this is where distributed consensus magic happens. What miners essentially do is establish candidate block (with all fields other than `hash` set) and then start changing `nonce` field trying to calculate hash that's lower than current mining difficulty (`bits` field). That is why you see certain number of leading zeros in the `hash`. Anyone receiving this block will be able to validate it pretty quickly - all you need to do is validate each transaction included and then calculate hash. If both tests pass - it's valid block on which you can build upon. Bitcoin Blockchain is defined as the one having the most cumulative proof of work. This provides incentive for you to intermediately add new block to tip of your Blockchain and then start calculating new blocks (so you can potentially get Coinbase reward + mining fees, if you discover new block).  

`prev_block` obviously points to previous block in Blockchain. `mrkl_root` is Merkle Root for Merkle Binary Tree built from all the transactions included in this block. So if you need to verify that certain transaction is included in this block, instead of downloading full block and iterating the full list; you would instead just request block header and complimentary transaction hashes that allow you to calculate and compare Merkle Tree Root ([Relevant StackExchange answer](https://bitcoin.stackexchange.com/a/38399/13744)).

`time` is Unix time - number of seconds since 1970-01-01 UTC. To read more about block structure, [see developer reference on bitcoin.org](https://bitcoin.org/en/developer-reference#block-headers).

## NBitcoin, utility classes, code examples

Now, everything I've described is obviously slightly different in production - if only for the fact that you'll be manipulating binary data, not JSONs. Meaning, you also need to worry about ordering of bytes, converting from bytes to other types (`int`, `char[]`).

Then also comes the cryptography part. How do you generate private/public key pair? How do you assign certain amount of Bitcoins to your wallet?

Well, that's exactly what Bitcoin Core does. It's reference implementation of Bitcoin protocol I've described in previous few sections. The only problem for C#.NET developers is that reference implementation is in C++. But luckily we have [NBitcoin](https://github.com/MetacoSA/NBitcoin). This is substantial port of Bitcoin Core, done in C#... [so faithful that it replicates OpenSSL bugs](https://github.com/MetacoSA/NBitcoin/blob/a785b5e0a0d6aec75638c58ae7b7d4f50532abdb/NBitcoin/ScriptEvaluationContext.cs#L1974).

So, let's start up [Visual Studio](https://www.visualstudio.com/downloads/) and open `.sln` file that's part of this repository. Let's go with few examples.

### Example 1

For start we will use NBitcoin to generate new private/public key pair and see what wallet address would be assigned to that pair on TestNet.

    public class Example1
    {
        private const string PRIVATE_KEY_PATH = "secret.key";
        private static readonly Network _network = Network.TestNet;
        internal static void Run()
        {
            Key key = loadKey();

            var address = key.PubKey.GetAddress(_network);
            Console.WriteLine("Your BTC address: {0}\n\n", address);

            saveKey(key);

            Console.ReadLine(); // wait for user input to proceed
        }

        private static Key loadKey()
        {
            // read key from disk, if it doesn't exist create new one
            Key key = null;
            if (File.Exists(PRIVATE_KEY_PATH))
                key = new Key(File.ReadAllBytes(PRIVATE_KEY_PATH));
            else
                key = new Key();
            return key;
        }

        private static void saveKey(Key key)
        {
            // save key to disk so it persists
            var keyBytes = key.ToBytes();
            File.WriteAllBytes(PRIVATE_KEY_PATH, keyBytes);
        }
    }

Super easy, right? Since we are on TestNet we can [request coins from this faucet here](https://testnet.manu.backend.hamburg/faucet). Be sure to say thanks to [metakiwi](https://twitter.com/metakiwi). 

### Example 2

Now that we have some TestNet Bitcoins assigned to our private key, let's see how would we generate transaction that would send those TBTC back to faucet. Again, NBitcoin makes this process pretty simple:

	public class Example2
    {
        private const string PRIVATE_KEY_PATH = "secret.key";
        private static readonly Network _network = Network.TestNet;

        private const string faucetReturnAddress = "2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF";
        private const decimal amountReceivedFromFaucet = 1.1m;
        private const decimal transactionFee = 0.001m;

        internal static void Run()
        {
            var coins = generateTxInput();

            var tx = BuildTransaction(coins);

            Console.WriteLine("Transaction ready to send");
            Console.WriteLine(tx.ToString());

            Console.ReadLine(); // wait for user input to proceed
        }

        public static Transaction BuildTransaction(params ICoin[] inputCoins)
        {
            Key key = LoadKey();

            var dest = _network.CreateBitcoinAddress(faucetReturnAddress);
            var txBuilder = new TransactionBuilder();
            var tx = txBuilder
                .AddCoins(inputCoins)
                .AddKeys(key)
                .Send(dest, new Money(amountReceivedFromFaucet - transactionFee, MoneyUnit.BTC))
                .SendFees(new Money(transactionFee, MoneyUnit.BTC))
                .SetChange(key.ScriptPubKey)
                .BuildTransaction(true);

            txBuilder.Verify(tx);

            return tx;
        }

        public static Key LoadKey()
        {
            // read key from disk, if it doesn't exist create new one
            Key key = null;
            if (File.Exists(PRIVATE_KEY_PATH))
                key = new Key(File.ReadAllBytes(PRIVATE_KEY_PATH));
            else
                throw new Exception("Please run Example 1 first");
            return key;
        }

        private static ICoin[] generateTxInput()
        {
            var key = LoadKey();
            var utxo = new Transaction()
            {
                Outputs = {
                    new TxOut(amountReceivedFromFaucet.ToString(),
                    key.GetBitcoinSecret(_network).GetAddress())
                }
            };

            Coin[] sendingCoins = utxo.Outputs
                .Select((o, i) => new Coin(new OutPoint(utxo.GetHash(), i), o))
                .ToArray();

            return sendingCoins;
        }
    }

If you run this example you should see something similar to Bitcoin transaction that we were discussing few sections back. However, we now come up with a question - how do you propagate this transactions to Bitcoin network? Where, that's exactly what we'll do next.

### Example 3

OK, confession time - in that previous example we faked input in `generateTxInput()` method. In order to create something that's real deal, we need to query TestNet and obtain reference to UTXO faucet created for us. Luckily [QBitNinja](https://github.com/MetacoSA/QBitNinja) can handle the task of both querying Blockchain, and then sending our transaction. Before you look at the code, please note that you'll need to update `fundingTransactionId` variable:

    public class Example3
    {
        private static readonly Network _network = Network.TestNet;

        private static string fundingTransactionId = "82334c387c1ba5d4e92a375a6cc65ae4eed61569cfd1a433ca94e95b81a4227d";

        internal static void Run()
        {
            var bitcoinPrivateKey = Example2.LoadKey();
            var client = new QBitNinjaClient(_network);

            var transactionId = uint256.Parse(fundingTransactionId);
            var transactionResponse = client.GetTransaction(transactionId).Result;

            var receivedCoins = transactionResponse.ReceivedCoins;
            ICoin coinsToSpend = null;
            foreach (var coin in receivedCoins)
            {
                if (coin.TxOut.ScriptPubKey == bitcoinPrivateKey.ScriptPubKey)
                {
                    coinsToSpend = coin;
                }
            }

            var tx = Example2.BuildTransaction(coinsToSpend);
            
            Console.WriteLine("Transaction ready to send");
            Console.WriteLine(tx.ToString());

            var broadcastResponse = client.Broadcast(tx).Result;

            if (!broadcastResponse.Success)
            {
                Console.Error.WriteLine("ErrorCode: " + broadcastResponse.Error.ErrorCode);
                Console.Error.WriteLine("Error message: " + broadcastResponse.Error.Reason);
            }
            else
            {
                Console.WriteLine("Success! You can check out the hash of the transaciton in any block explorer:");
                Console.WriteLine(tx.GetHash());
            }

            Console.ReadLine(); // wait for user input to proceed
        }
    }

Code is pretty straightforward... but if you have any questions - hit me up during one of the future meetups ;)

## Where to from here

To the moon, obviously. I wrote [more detailed article on CodeProject](https://www.codeproject.com/Articles/1207351/Accepting-Bitcoin-BTC-payments-with-Csharp-ASP-NET) on this subject. It has lots of videos plus a bit more on both economy and technology. Also, I open sourced wrapper for Coinpayments API that allows you to pretty much receive and send any crypto (warning: this is without you controlling private keys):

https://www.codeproject.com/Articles/1207351/Accepting-Bitcoin-BTC-payments-with-Csharp-ASP-NET

Also, Nicolas has awesome eBook: [Programming the Blockchain in C#](https://www.gitbook.com/book/programmingblockchain/programmingblockchain/details) that provides way more theoretical discussions and examples.

And of course, there is [Mastering Bitcoin by Andreas Antonononpolous](https://github.com/bitcoinbook/bitcoinbook). Andreas and his publisher generously made book basically free, asking people NOT to distribute PDF until they make profit from direct sales.

Finally, ChiTown Crypto has Telegram and I sometimes hang out there, so if you need any help consider joining: https://t.me/ChiTownCrypto

## Will Bitcoin die?
It will - at the same time the Internet dies.