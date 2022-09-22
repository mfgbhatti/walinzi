import { Injectable } from '@angular/core';
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
  getDoc
 } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Clients } from '../_modals';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private ClientCollectionRef!: CollectionReference<DocumentData>;
  dbPath: string = 'Clients';

  constructor( private readonly firestore: Firestore) { 
    this.ClientCollectionRef = collection(this.firestore, this.dbPath);
  }

  getAll() {
    return collectionData(this.ClientCollectionRef, {
      idField: 'id'
    }) as Observable<Clients[]>
  }

  get(id: string) {
    const docRef = doc(this.firestore, this.dbPath, id);
    // return getDoc(docRef);
    return docData(docRef, { idField: 'id' });
    // const docSnap =  getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }

  create(client: Clients) {
      try {
        addDoc(this.ClientCollectionRef, client);
      } catch(err) {
        console.error("Error: writeToDB failed. Reason :", err)
      }
  }

  update(client: Clients) {
    const docRef = doc(
      this.firestore,
      `Clients/${client.id}`
    );
    return updateDoc(docRef, { ...client});
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.dbPath, id);
    return deleteDoc(docRef);
  }
}
