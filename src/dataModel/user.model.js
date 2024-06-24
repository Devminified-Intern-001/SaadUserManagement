var uri = "mongodb+srv://saadullah:saad2003@devminified.hiye9xh.mongodb.net/";
const { MongoClient, ServerApiVersion } = require("mongodb");
const dbName = "userManagement";
const collectionName = "users";

class userClass {
    constructor() {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        this.db = this.client.db(dbName);
    }

    async initialize() {
        return this.client.connect();
    }

    async closeConnection() {
        return this.client.close();
    }

    async getDoc(name) {
        var query = { name: name };
        return this.db
            .collection(collectionName)
            .find(query)
            .toArray()
            .then((fetchedDocs) => {
                if (fetchedDocs.length == 0) return null;
                else return fetchedDocs[0];
            })
            .catch((error) => {
                return {};
            });
    }

    async exists(name) {
        var query = { name: name };
        let results = await this.db
            .collection(collectionName)
            .find(query)
            .toArray();
        return results.length != 0;
    }

    async create(name, age) {
        return this.exists(name)
            .then((exists) => {
                if (name && age && !exists) {
                    let doc = {
                        name: name,
                        age: parseInt(age),
                        retired: age < 60 ? false : true,
                    };
                    this.db.collection(collectionName).insertOne(doc);
                    return true;
                } else return false;
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    }

    async get(name, age) {
        let query = {};
        if (name) query["name"] = name;
        if (age) query["age"] = parseInt(age);
        return this.db.collection(collectionName).find(query).toArray();
        return results;
    }

    async del(name) {
        let fetchedResults = await this.getDoc(name);
        if (fetchedResults == null) return false;
        let query = { name: name };
        return this.db
            .collection(collectionName)
            .deleteOne(query)
            .then(() => true)
            .catch((error) => false);
    }

    async update(name, age) {
        let fetchedResults = await this.getDoc(name);
        if (fetchedResults == null) return false;
        let query = { name: name };
        let newVals = {
            $set: { name: name, age: age, retired: age < 60 ? false : true },
        };
        return this.db
            .collection(collectionName)
            .updateOne(query, newVals)
            .then(() => true)
            .catch((error) => false);
    }

    async retire(name) {
        let fetchedResults = await this.getDoc(name);
        if (fetchedResults == null) return false;
        let query = { name: name };
        let newVals = { $set: { retired: true, age: 60 } };
        return this.db
            .collection(collectionName)
            .updateOne(query, newVals)
            .then(() => true)
            .catch((error) => false);
    }
}

var User = new userClass();

module.exports = User;
