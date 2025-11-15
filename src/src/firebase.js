import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

export async function signUp(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  return await signOut(auth);
}

export async function fetchProducts() {
  const colRef = collection(db, 'products');
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchProductById(id) {
  const d = await getDoc(doc(db, 'products', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

export async function createOrder(order) {
  const ordersCol = collection(db, 'orders');
  const docRef = await addDoc(ordersCol, {
    ...order,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function markOrderPaid(orderId, txnData) {
  const ref = doc(db, 'orders', orderId);
  await setDoc(
    ref,
    { status: 'paid', paidAt: serverTimestamp(), transaction: txnData },
    { merge: true }
  );
}
