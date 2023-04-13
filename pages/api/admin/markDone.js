import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();
handler.use(middleware);
handler.post(async (req, res) => {
  let data = JSON.parse(req.body);
  let id = new ObjectId(data.id);
  let doc = await req.db.collection("orders").deleteOne({ _id: id });
  res.json({ message: doc });
});

export default handler;
