//import clientPromise from "../lib/mongodb";
import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  //const client = await clientPromise;
  await client.connect();
  req.dbClient = client;
  req.db = client.db("fcc-mongodb-and-mongoose");
  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;
