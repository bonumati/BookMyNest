import { MongoClient } from "mongodb";

const mongoConfig = {
  serverUrl:
    "mongodb+srv://sdiware:ShashwatiDiware@book-my-nest.e28qc52.mongodb.net/?retryWrites=true&w=majority",
  database: "Book_My_Nest",
};

let _connection = undefined;
let _db = undefined;
module.exports = {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(mongoConfig.serverUrl);
      _db = await _connection.db(mongoConfig.database);
    }
    console.log("Connected to db :)");

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};
