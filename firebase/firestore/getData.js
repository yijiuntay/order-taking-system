import firebase_app from "../config";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getData(collectionName) {
  const docRef = doc(collection(db, collectionName));
  const unsub = onSnapshot(
    docRef,
    (snapshot) => {
      console.log("Current data: ", snapshot.data());
    },
    (error) => console.log(error)
  );
}
