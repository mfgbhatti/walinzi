import { Injectable } from '@angular/core';
import {
  doc,
  addDoc,
  docData,
  deleteDoc,
  updateDoc,
  Firestore,
  collection,
  DocumentData,
  collectionData,
  CollectionReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

import { Client } from 'src/app/clients/shared';

@Injectable({
  providedIn: 'any'
})
export class ClientService {
  private ClientCollectionRef!: CollectionReference<DocumentData>;
  path: string = 'Clients';

  constructor(private readonly firestore: Firestore) {
    this.ClientCollectionRef = collection(this.firestore, this.path);
  }

  getAll() {
    return collectionData(this.ClientCollectionRef, {
      idField: 'id'
    }) as Observable<Client[]>
  }

  get(id: string) {
    const docRef = doc(this.firestore, this.path, id);
    return docData(docRef, { idField: 'id' });
  }

  create(client: Client) {
    try {
      addDoc(this.ClientCollectionRef, client);
    } catch (err) {
      console.error("Error: writeToDB failed. Reason :", err)
    }
  }

  update(client: Client) {
    const docRef = doc(
      this.firestore,
      `${this.path}/${client.id}`
    );
    return updateDoc(docRef, { ...client });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.path, id);
    return deleteDoc(docRef);
  }

}
