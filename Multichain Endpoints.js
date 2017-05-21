//http://www.multichain.com/developers/json-rpc-api/
//https://github.com/scoin/multichain-node/blob/development/test/test.js
//https://www.imsasllc.com/docs/api/criminal
//Account ID:	128266
//API Key:	r5r7D6Ekp58Mqn8WUsk6ZGsVp8

const assert = require('assert');
var CryptoJS = require("crypto-js");
const bluebird = require("bluebird");
const connection = {
   port: 2914
   , host: ‘REDACTED’
   , user: "multichainrpc"
   , pass: "REDACTED"
}
const multichain = bluebird.promisifyAll(require("./index.js")(connection), {
   suffix: "Promise"
});
var appRouter = function (app) {
      app.get("/getInfo", function (req, res) {
         multichain.getInfo((err, info) => {
            if (err) {
               console.log(err);
               throw err;
            }
            res.send(info);
         })
      });
      app.get("/createUser", function (req, res) {
         
            var firstName = req.query.firstName;
            var middleName = req.query.middleName;
            var lastName = req.query.lastName;
            var dateOfBirth = req.query.dateOfBirth;
            var addressRoad = req.query.address;
            var city = req.query.city;
            var state = req.query.city;
            var country = req.query.country;
            var ssn = req.query.ssn;
            
         multichain.getNewAddressPromise().then(address => {
            multichain.dumpPrivKeyPromise({
                     address: address
                  }, (err, priv) => {
                     res.send(address + " " + priv)  
        }
               )});      
                     /*
                     createToken(address, "middleName", middleName);
                     createToken(address, "lastName", lastName);
                     createToken(address, "dateOfBirth", dateOfBirth)
                     createToken(address, "addressRoad", addressRoad);
                     createToken(address, "city", city);
                     createToken(address, "state", state);
                     createToken(address, "country", country);
                     createToken(address, "ssn", ssn);
                     */
               /*  then(createToken(address, "middleName", middleName))
                  then(createToken(address, "lastName", lastName))
                  then(createToken(address, "dateOfBirth", dateOfBirth))
                  then(createToken(address, "addressRoad", addressRoad))
                  then(createToken(address, "city", city))
                  then(createToken(address, "state", state))
                  .then(createToken(address, "country", country))
                  .then(createToken(address, "ssn", ssn))
                  .catch(err => {
        console.log(err)
        throw err;
    })
                  */
                  
         
      });
      
      
      
      
      app.get("/passportVerification", function (req, res){
         //multichain
         
         createTokenFrom("14F8GNZjoMAu4RZVcp4RZdX331xRktY1mxexgg", req.query.address, "passport", "true")
            
         });
         
         app.get("/test", function (req, res){
            console.log(req.query.fromAddress)
            console.log(req.query.toAddress)

           multichain.issueFromPromise({
            from: req.query.fromAddress,
            to: req.query.toAddress,
            asset: "barcoin",
            qty: 10000,
            details: {
                "foo": "bar"
            }
        }).then(
           res.send("done")
           )
         });

   function createToken(toAddress, tokenName, value) {
            multichain.issuePromise({
            to: toAddress,
            asset: tokenName,
            qty: 1,
            details: {
                "test": "value"
            }
        }).then(
           console.log("Done")
           )
         }
         
   function createTokenFrom(fromAddress, toAddress, tokenName, value) {
            multichain.issueFromPromise({
            from: fromAddress,
            to: toAddress,
            asset: tokenName,
            qty: 1,
            details: {
                tokenName: value
            }
        }).then(
           console.log("Done")
           )
         }      
         
         
      /*
      app.get("/creditScoreVerification", function (req, res){
         //multichain
         
         multichain.issueFromPromise({
            from: HARDCODE_ADDRESS,
            to: req.ssn,
            asset: "Credit Score",
            qty: 1,
            details: {
                "signature": "Experian"
            }
        })
         
      });
      */
}
/*
      app.get("/checkKeyExists", function (req, res) {
         multichain.listStreamKeyItems({
            stream: req.query.stream
            , key: req.query.key
         }, (err, tx) => {
            //multichain.decodeRawExchange({"hexstring": tx}, (err, dTx) => {
            res.send(tx);
            //})
         })
      });
      app.get("/checkStreamExists", function (req, res) {
         multichain.listStreamKeys({
            stream: req.query.stream
         }, (err, tx) => {
            //multichain.decodeRawExchange({"hexstring": tx}, (err, dTx) => {
            res.send(tx);
            //})
         })
      });
      app.get("/createUser", function (req, res) {
         multichain.getNewAddress((err, addr) => {
            res.send(addr);
         })
      });
      app.get("/getPrivKey", function (req, res) {
         multichain.dumpPrivKey({
            address: req.query.address
         }, (err, addr) => {
            res.send(addr);
         })
      });
      app.get("/doMain", function (req, res) {
         if (ifPersonExists(req.query.eID)) {
            res.send("User already exists");
         }
         else {
            var workingAddr;
            var privKey;
            var eID = req.query.eID;
            var smartKey = req.query.smartKey;
            var birthYear = req.query.birthYear;
            var Sex = req.query.Sex;
            var placeOfBirth = req.query.placeOfBirth;
            var nationality = req.query.nationality;
            var currentResidence = req.query.currentResidence;
            var firstName = req.query.firstName;
            var lastName = req.query.lastName;
            var dateOfBirth = req.query.dateOfBirth;
            multichain.getNewAddressPromise().then(address => {
                  assert(address, "Could not get new address")
                  console.log(address);
                  console.log("TEST: VALIDATE ADDRESS")
                  multichain.dumpPrivKeyPromise({
                     address: address
                  }, (err, priv) => {
                     //var ciphertext = CryptoJS.AES.encrypt(priv, req.query.eID);
                     //console.log(ciphertext.toString());
                     privKey = CryptoJS.AES.encrypt(priv, smartKey).toString()
                     multichain.createPromise({
                        name: eID
                        , open: true
                        , from: address
                        , details: {
                           wallet: address
                        }
                     }).then(multichain.grantPromise({
                        addresses: address
                        , permissions: "send,receive,issue"
                     })).then(multichain.publishPromise({
                        stream: eID
                        , key: "wallet"
                        , data: new Buffer(address).toString("hex")
                     })).then(multichain.publishPromise({
                        stream: eID
                        , key: "privID"
                        , data: new Buffer(privKey).toString("hex")
                     })).then(publishToStream(eID, "birthYear", birthYear)).then(publishToStream(eID, "Sex", Sex)).then(publishToStream(eID, "placeOfBirth", placeOfBirth)).then(publishToStream(eID, "nationality", nationality)).then(publishToStream(eID, "currentResidence", currentResidence)).then(publishToStream(eID, "firstName", CryptoJS.AES.encrypt(firstName, smartKey).toString())).then(publishToStream(eID, "lastName", CryptoJS.AES.encrypt(lastName, smartKey).toString())).then(publishToStream(eID, "dateOfBirth", CryptoJS.AES.encrypt(dateOfBirth, smartKey).toString())).catch(res.send("complete"));
                  })
               })
               //   console.log(workingAddr);
               //   console.log(getPrivKey(workingAddr) + " " + req.smartKey)
               //publishToStream(workingAddr,req.eID,"wallet",encryptPrivKey(getPrivKey(workingAddr,req.smartKey)));
               //   res.send("Created new user");
         }
      })
      app.get("/getKey", function (req, res) {
         var eID = req.query.eID;
         var smartKey = req.query.smartKey;
         var dataKey = req.query.dataKey;
         //payload["firstName"] = getFromChain(eID, "firstName", smartKey);
         //payload["lastName"] = getFromChain(eID, "lastName", smartKey);
         multichain.listStreamKeyItemsPromise({
            stream: eID
            , key: dataKey
         }, (err, tx) => {
            var output = new Buffer(tx[0].data, 'hex');
           res.send(output);
         })

      })

      function getFromChain(stream, key) {
         multichain.listStreamKeyItems({
            stream: stream
            , key: key
         }, (err, tx) => {
            payload[key] = tx[0].data;
         })
      }

     

         function ifPersonExists(eID) {
            multichain.listStreamKeys({
               stream: eID
            }, (err, tx) => {
               if (tx != "") {
                  return true
               }
               else {
                  return false
               }
            })
         }

         function createUser() {
            multichain.getNewAddress((err, addr) => {
               return (addr.toString())
            })
         }

         function getPrivKey(addr) {
            multichain.dumpPrivKey({
               address: addr
            }, (err, result) => {
               return (result)
            })
         }

         function encryptPrivKey(privKey, smartPubKey) {
            var ciphertext = CryptoJS.AES.encrypt(privKey, smartPubKey);
            return (ciphertext.toString());
         }

         function publishToStream(stream, key, data) {
            multichain.publishPromise({
               stream: stream
               , key: key
               , data: new Buffer(data).toString("hex")
            })
         }
      }
      */
      
      module.exports = appRouter;