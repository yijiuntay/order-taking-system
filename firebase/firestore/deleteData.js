import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteData(collectionName, docId) {
  let result = null,
    error = null;
  try {
    result = await deleteDoc(doc(db, collectionName, docId));
  } catch (e) {
    error = e;
  }
  return { result, error };
}
