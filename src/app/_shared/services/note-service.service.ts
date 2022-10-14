import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore/lite/';
import { Observable } from 'rxjs/internal/Observable';

import { Notes } from 'src/app/_shared';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  path: string = 'Notes';
  id: string = 'relative_id';

  constructor(private readonly firestore: Firestore) { }

  add(data: Notes) {
    try {
      addDoc(collection(this.firestore, this.path), data);
    } catch (err) {
      console.error('Error: writeToDB ' + this.path + ' failed. Reason :', err)
    }
  }

  get(id: string) {
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where(`${this.id}`, '==', String(id)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  update(data: Notes) {
    const docRef = doc(this.firestore, this.path, data.id);
    return updateDoc(docRef, { ...data });

  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.path, String(id));
    return deleteDoc(docRef);
  }
}
