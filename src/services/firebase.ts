import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import dayjs from 'dayjs';
import { ReportItem } from '../models/ReportItem';

const firebaseConfig = {
  apiKey: "AIzaSyBVxBjEnjh0lzl0nrnkYn9kWmeQt0g6SmI",
  authDomain: "resto-tt.firebaseapp.com",
  projectId: "resto-tt",
  storageBucket: "resto-tt.appspot.com",
  messagingSenderId: "195459504176",
  appId: "1:195459504176:web:14982e8d4273d7845cf5f5",
  measurementId: "G-XC175Z542H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth: any, additionalData?: any) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date().toISOString();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const setRestaurant = async (userId: string, name: string) => {
  const queryRef = firestore.collection('restaurants').where('userId', '==', userId);
  const snapshot = await queryRef.get();

  if (!snapshot.empty) {
    snapshot.docs[0].ref.update({name});
  }
};

export const createRestaurant = async (userId: string) => {
  const queryRef = firestore.collection('restaurants').where('userId', '==', userId);
  const snapshot = await queryRef.get();

  if (snapshot.empty) {
    const restoDocRef = firestore.collection('restaurants').doc();
    await restoDocRef.set({ userId });
    return restoDocRef;
  } else {
    return snapshot.docs[0].ref;
  }
};

export const getReportData = async (restaurantId: string, startDate: Date, endDate: Date) => {
  const tables = await getTables(restaurantId);
  const tableIds = Array.from(tables.keys());
  const queryRef = firestore.collection('reservations')
    .where('tableId', 'in', tableIds)
    .where('dateTime', '>=', startDate)
    .where('dateTime', '<=', endDate)
    .orderBy('dateTime');
  const snapshot = await queryRef.get();
  let list: ReportItem[] = [];
  snapshot.forEach(doc => {
    const reservation = doc.data();
    const reservationTime = dayjs(reservation.dateTime.toDate()).format('HH:mm');
    const item: ReportItem = {
      key: doc.id,
      tableNum: tables.get(reservation.tableId).num,
      reservationTime,
      customerName: reservation.customerName,
      customerPhone: reservation.customerPhone,
      customerEmail: reservation.customerEmail,
    };
    list.push(item);
    list = list.sort((a, b) => a.tableNum - b.tableNum);
  })
  return list;
};

const getTables = async (restaurantId: string) => {
  const queryRef = firestore.collection('tables').where('restaurantId', '==', restaurantId);
  const snapshot = await queryRef.get();
  let map = new Map();
  snapshot.forEach(doc => {
    map.set(doc.id, doc.data());
  })
  return map;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;