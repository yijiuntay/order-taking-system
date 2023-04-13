import Head from "next/head";
import styles from "@/styles/ClientHome.module.css";
import { useState } from "react";
import produce from "immer";
import _ from "lodash";
import fetch from "isomorphic-unfetch";

export default function ClientHome() {
  const [orders, setOrders] = useState({});

  const handleAddOrderItem = async (e) => {
    e.preventDefault();
    let orderItemLower = e.target.orderItem.value.toLowerCase();
    setOrders(
      produce((draft) => {
        if (Object.hasOwn(draft, orderItemLower)) {
          draft[orderItemLower]++;
        } else {
          draft[orderItemLower] = 1;
        }
      })
    );
    document.getElementsByName("orderForm")[0].reset();
  };

  const handleIncrement = (key) => {
    setOrders(
      produce((draft) => {
        draft[key]++;
      })
    );
  };

  const handleDecrement = (key) => {
    setOrders(
      produce((draft) => {
        if (draft[key] === 1) {
          delete draft[key];
        } else {
          draft[key]--;
        }
      })
    );
  };

  const submitOrder = async () => {
    let reqBody = produce({}, (draft) => {
      draft["tableNo"] = 1;
      draft["orders"] = orders;
    });
    try {
      const res = await fetch("/api/client", {
        method: "post",
        body: JSON.stringify(reqBody),
      });
    } catch (error) {
      console.log("submit order error", error);
      console.dir(error);
    }
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
            autoComplete="off"
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
          {!_.isEmpty(orders) ? (
            Object.entries(orders).map(([key, value]) => (
              <div key={key} className={styles.eachOrderDisplay}>
                <label className={styles.eachOrderItemName}>{key}</label>
                <div className={styles.addRemoveButtons}>
                  <label>x{value}</label>
                  <button
                    className={styles.eachButton}
                    onClick={() => handleDecrement(key)}
                  >
                    -
                  </button>
                  <button
                    className={styles.eachButton}
                    onClick={() => handleIncrement(key)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1>No order item added yet</h1>
          )}
        </div>
        <div className={styles.submitButtonSection}>
          <button className={styles.submitButton} onClick={submitOrder}>
            Submit Order
          </button>
        </div>
      </main>
    </>
  );
}
