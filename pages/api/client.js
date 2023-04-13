import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();
handler.use(middleware);
handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  let doc = await req.db.collection("orders").updateOne(
    {
      tableNo: data.tableNo,
    },
    { $set: data },
    { upsert: true }
  );
  res.json({ message: "ok" });
});

export default handler;
