import { firestore } from './firebase';
import { Reservation } from '../models/Reservation';
import dayjs from 'dayjs';

export class ReservationService {
  static find = async (tableId: string, fromFuture: boolean) => {
    let queryRef = firestore.collection('/reservations').where('tableId', '==', tableId);
    const today = dayjs().startOf('day').toDate();
    if (fromFuture) {
      queryRef = queryRef.where('dateTime', '>=', today).orderBy('dateTime', 'asc');
    } else {
      const lastMonth = dayjs().subtract(1, 'month').toDate();
      queryRef = queryRef.where('dateTime', '>=', lastMonth).where('dateTime', '<=', today).orderBy('dateTime', 'desc');
    }
    const querySnapshot = await queryRef.get();
    let list = [];
    querySnapshot.forEach(doc => {
      const reservation: any = {...doc.data(), id: doc.id};
      reservation.dateTime = dayjs(reservation.dateTime.toDate());
      list.push(reservation);
    })
    return list as Reservation[];
  }

  static create = async (reservation: Reservation) => {
    try {
      delete reservation.id;
      reservation.dateTime = dayjs(reservation.dateTime).toDate();
      const docRef = await firestore.collection('/reservations').add(reservation);
      console.log('Create successful:', docRef.id);
    } catch (error) {
      console.error('Error creating', error);
    }
  }

  static update = async (id: string, reservation: Reservation) => {
    try {
      delete reservation.id;
      reservation.dateTime = dayjs(reservation.dateTime).toDate();
      await firestore.collection('/reservations').doc(id).update(reservation);
      console.log('Update successful:', id);
    } catch (error) {
      console.error('Error updating', error);
    }
  }

  static remove = async (id: string) => {
    try {
      await firestore.collection('/reservations').doc(id).delete();
      console.log('Remove successful:', id);
    } catch (error) {
      console.error('Error removing', error);
    }
  }
}