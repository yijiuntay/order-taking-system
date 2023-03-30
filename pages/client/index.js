import Head from "next/head";
import styles from "@/styles/ClientHome.module.css";
import { useState } from "react";

export default function ClientHome() {
  const [orders, setOrders] = useState([]);

  const handleAddOrderItem = async (e) => {
    e.preventDefault();
    let tmpOrderIndex = orders.findIndex(
      (o) => o.itemName === e.target.orderItem.value.toLowerCase()
    );
    if (tmpOrderIndex === -1) {
      setOrders([
        ...orders,
        { itemName: e.target.orderItem.value.toLowerCase(), quantity: 1 },
      ]);
    } else {
      let updatedOrders = [...orders];
      updatedOrders[tmpOrderIndex].quantity =
        updatedOrders[tmpOrderIndex].quantity + 1;
      setOrders(updatedOrders);
    }
    document.getElementsByName("orderForm")[0].reset();
  };

  return (
    <>
      <Head>
        <title>Client</title>
        <meta name="description" content="Client homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.inputSection}>
          <h1>Enter order item number</h1>
          <form
            className={styles.orderForm}
            name="orderForm"
            autocomplete="off"
            onSubmit={handleAddOrderItem}
          >
            <input
              type="text"
              required
              id="orderItem"
              name="orderItem"
              className={styles.inputStyle}
            />
            <input
              type="submit"
              value="Add item"
              id="btnsubmit"
              className={styles.submitButton}
            />
          </form>
        </div>
        <div className={styles.displaySection}>
          {orders.length > 0 ? (
            orders.map((o, i) => (
              <div key={i} className={styles.eachOrderDisplay}>
                <label className={styles.eachOrderItemName}>{o.itemName}</label>
                <label>x{o.quantity}</label>
              </div>
            ))
          ) : (
            <h1>No order item added yet</h1>
          )}
        </div>
      </main>
    </>
  );
}
