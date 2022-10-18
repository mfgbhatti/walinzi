import { Injectable } from '@angular/core';
import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  Firestore,
  collection,
  DocumentData,
  collectionData,
  CollectionReference,
  query,
  where,
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
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where('id', '==', String(id)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
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
