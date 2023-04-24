"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const url_1 = require("url");
const axios_1 = require("axios");
const index_routes_1 = __importDefault(require("./src/routes/index.routes"));
const tools_1 = require("./src/tools");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: [tools_1.env.WEB_URL, tools_1.env.DOMAIN], credentials: true }));
app.use((req, _res, next) => {
    const url = (0, url_1.parse)(req.url);
    console.log(`${req.method} ${url.pathname} ${url.query || ""}`);
    next();
});
app.use("/api", index_routes_1.default);
app.use((err, _req, res, _next) => {
    if (err instanceof tools_1.ApiError)
        return res.status(err.code).json(err);
    if (err instanceof axios_1.AxiosError && err.response.data)
        return res.status(err.response.status).json(err.response.data);
    if (err instanceof Error) {
        if ("errors" in err)
            return res.status(400).json({ code: 400, message: err.message.split(":")[2].trim() });
        return res.status(400).json({ code: 400, message: err.message });
    }
    console.error(err, "[API] error");
    res.status(500).send({ code: 500, error: "Something went wrong. Check logs" });
});
// initDatabase();
const { MongoClient } = require("mongodb");
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://deningzhang:123123123@cluster0.z13z3dq.mongodb.net/?retryWrites=true&w=majority";
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
app.listen(tools_1.env.PORT, () => console.log(`Server listening on port: ${tools_1.env.PORT}`));
//# sourceMappingURL=index.js.map