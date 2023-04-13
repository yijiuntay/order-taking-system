import Head from "next/head";
import styles from "@/styles/AdminHome.module.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AdminHome() {
  const { data, error, isLoading, mutate } = useSWR("/api/admin/get", fetcher);

  const handleMarkDone = async (id) => {
    let reqBody = {
      id: id,
    };
    try {
      const res = await fetch("/api/admin/markDone", {
        method: "post",
        body: JSON.stringify(reqBody),
      });
      mutate();
    } catch (error) {
      console.log("mark done error", error);
      console.dir(error);
    }
  };

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
        </div>
        <div className={styles.orderGridContainer}>
          {error ? (
            <div>Failed to load</div>
          ) : isLoading ? (
            <div>Loading</div>
          ) : (
            data.map(({ _id, tableNo, orders }) => (
              <div className={styles.orderGridItem} key={_id}>
                <label>Table #{tableNo}</label>
                <div className={styles.orderList}>
                  {Object.entries(orders).map(([key, value]) => (
                    <div className={styles.orderItem} key={key}>
                      <label className={styles.orderItemName}>{key}</label>
                      <label>x{value}</label>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleMarkDone(_id)}>Mark Done</button>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
