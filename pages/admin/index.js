import Head from "next/head";
import styles from "@/styles/AdminHome.module.css";

const tempOrders = [
  {
    table: 1,
    order: [
      {
        itemName: "Chicken Burger",
        quantity: 1,
      },
      {
        itemName: "Chrysanthemum Tea",
        quantity: 1,
      },
    ],
  },
  {
    table: 2,
    order: [
      {
        itemName: "Chicken Schnitzel",
        quantity: 1,
      },
      {
        itemName: "Winter Melon Tea",
        quantity: 1,
      },
    ],
  },
  {
    table: 3,
    order: [
      {
        itemName: "Roti John",
        quantity: 2,
      },
      {
        itemName: "Mac and Cheese",
        quantity: 1,
      },
      {
        itemName: "Lo Han Guo",
        quantity: 3,
      },
    ],
  },
];

export default function AdminHome() {
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
          {tempOrders.map((table, i) => (
            <div className={styles.orderGridItem} key={i}>
              <label>Table #{table.table}</label>
              <div className={styles.orderList}>
                {table.order.map((order, j) => (
                  <div className={styles.orderItem} key={j}>
                    <label className={styles.orderItemName}>
                      {order.itemName}
                    </label>
                    <label>x{order.quantity}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
