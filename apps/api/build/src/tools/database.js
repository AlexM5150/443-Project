"use strict";
// import env from "./env";
// import mongoose from "mongoose";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default async function initDatabase() {
//   mongoose.set("strictQuery", true);
//   mongoose.connect(`mongodb://127.0.0.1:27017/cecs443`, {
//     user: 'user',
//     pass: 'password',
//     authSource: "admin",
//   });
//   const { connection } = mongoose;
//   connection.on("open", () => console.log(`Connected to ${env.DB_NAME} database`));
//   connection.on("error", (e) => {
//     console.error("connection failed", e);
//     process.exit(1);
//   });
// }
function initDatabase() {
    const { MongoClient } = require("mongodb");
    // Replace the following with your Atlas connection string                                                                                                                                        
    const url = "mongodb+srv://deningzhang:123@cluster1.cpmlgt0.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.connect();
                console.log("Connected correctly to server");
            }
            catch (err) {
                console.log(err.stack);
            }
            finally {
                yield client.close();
            }
        });
    }
    run().catch(console.dir);
}
exports.default = initDatabase;
// // --------------------------
// const { MongoClient } = require("mongodb");
// // Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://deningzhang:123123123@cluster0.z13z3dq.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://deningzhang:123123123@cluster0.z13z3dq.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(() => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
//# sourceMappingURL=database.js.map