import firebase_app from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signOut() {
  auth.signOut();
}
