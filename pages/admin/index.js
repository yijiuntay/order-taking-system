import Head from "next/head";
import styles from "@/styles/AdminHome.module.css";
//import useSWR from "swr";
import React from "react";
import { useAuthContext } from "../../src/context/AuthContext";
import { useRouter } from "next/navigation";
import firebase_app from "../../firebase/config";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import signOut from "../../firebase/auth/signout";
import deleteData from "../../firebase/firestore/deleteData";

//const fetcher = (...args) => fetch(...args).then((res) => res.json());
const db = getFirestore(firebase_app);
const dbQuery = query(collection(db, "orders"));

export default function AdminHome() {
  const { user } = useAuthContext();
  const router = useRouter();
  //const { data, error, isLoading, mutate } = useSWR("/api/admin/get", fetcher);

  const [data, setData] = React.useState([]);

  const handleMarkDone = async (id) => {
    //let reqBody = {
    //  id: id,
    //};
    //try {
    //  const res = await fetch("/api/admin/markDone", {
    //    method: "post",
    //    body: JSON.stringify(reqBody),
    //  });
    //mutate();
    //} catch (error) {
    //  console.log("mark done error", error);
    //  console.dir(error);
    //}
    const { result, error } = await deleteData("orders", id);
    if (error) {
      return console.log(error);
    }
  };

  React.useEffect(() => {
    if (user === null) router.push("/signin");
  }, [user]);

  React.useEffect(() => {
    const unsub = onSnapshot(
      dbQuery,
      (snapshot) => {
        let newData = [];
        snapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
      },
      (error) => console.log(error)
    );
  }, []);

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Admin homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h1>Orders</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
        <div className={styles.orderGridContainer}>
          {data.map(({ id, tableNo, orders }) => (
            <div className={styles.orderGridItem} key={id}>
              <label>Table #{tableNo}</label>
              <div className={styles.orderList}>
                {Object.entries(orders).map(([key, value]) => (
                  <div className={styles.orderItem} key={key}>
                    <label className={styles.orderItemName}>{key}</label>
                    <label>x{value}</label>
                  </div>
                ))}
              </div>
              <button onClick={() => handleMarkDone(id)}>Mark Done</button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
