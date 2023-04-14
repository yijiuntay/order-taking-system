import firebase_app from "../config";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(collectionName, data) {
  let result = null,
    error = null;
  const docRef = doc(collection(db, collectionName));
  try {
    result = await setDoc(docRef, data);
  } catch (e) {
    error = e;
  }
  return { result, error };
}
