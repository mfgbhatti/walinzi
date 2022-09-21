import { Injectable } from '@angular/core';
import {
  // CollectionReference,
  // DocumentData,
  // addDoc,
  // deleteDoc,
  // doc,
  // updateDoc,
} from '@firebase/firestore';
import { 
  Firestore, 
  collectionData, 
  docData, 
  collection,
  CollectionReference,
  DocumentData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
 } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Clients } from '../_modals';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private ClientCollectionRef!: CollectionReference<DocumentData>;

  constructor( private readonly firestore: Firestore) { 
    this.ClientCollectionRef = collection(this.firestore, 'Clients');
  }

  getAll() {
    return collectionData(this.ClientCollectionRef, {
      idField: 'id'
    }) as Observable<Clients[]>
  }

  get(id: string) {
    const docRef = doc(this.firestore, `Clients/${id}`);
    return docData(docRef, { idField: 'id' });
  }

  create(client: Clients) {
    console.log(client)
      try {
        addDoc(this.ClientCollectionRef, client);
      } catch(err) {
        console.error("writeToDB failed. reason :", err)
      }
    // .catch( (error) => console.log(error));
    // return setDoc(doc(this.ClientCollectionRef, client));
  }

  update(client: Clients) {
    const docRef = doc(
      this.firestore,
      `Clients/${client.id}`
    );
    return updateDoc(docRef, { ...client});
  }

  delete(id: string) {
    const docRef = doc(this.firestore, `Clients/${id}`);
    return deleteDoc(docRef);
  }
  creat_test(data: any){
    return addDoc(this.ClientCollectionRef, data);
  }
}
