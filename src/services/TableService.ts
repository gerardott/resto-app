import { firestore } from './firebase';
import { Table } from '../models/Table';

export class TableService {
  static find = async () => {
    const collRef = firestore.collection('/tables')
    const querySnapshot = await collRef.get();
    let list = [];
    querySnapshot.forEach(doc => {
      const table = {...doc.data(), id: doc.id};
      list.push(table);
    })
    return list as Table[];
  }

  static create = async (table: Table) => {
    try {
      delete table.id;
      const docRef = await firestore.collection('/tables').add(table);
      console.log('Create ok: ', docRef.id);
    } catch (error) {
      console.error('Error creating', error);
    }
  }

  static update = async (id: string, table: Table) => {
    try {
      delete table.id;
      const docRef = await firestore.collection('/tables').doc(id).set(table);
      console.log('Update ok: ', docRef);
    } catch (error) {
      console.error('Error creating', error);
    }
  }

  static remove = async (table: Table) => {
  }
}