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
import { Observable } from 'rxjs';

import { Clients } from 'src/app/clients/shared';

@Injectable({
  providedIn: 'any'
})
export class ClientsService {
  private ClientCollectionRef!: CollectionReference<DocumentData>;
  clientsPath: string = 'Clients';

  constructor(private readonly firestore: Firestore) {
    this.ClientCollectionRef = collection(this.firestore, this.clientsPath);
  }

  getAll() {
    return collectionData(this.ClientCollectionRef, {
      idField: 'id'
    }) as Observable<Clients[]>
  }

  get(id: string) {
    const docRef = doc(this.firestore, this.clientsPath, id);
    return docData(docRef, { idField: 'id' });
  }

  create(client: Clients) {
    try {
      addDoc(this.ClientCollectionRef, client);
    } catch (err) {
      console.error("Error: writeToDB failed. Reason :", err)
    }
  }

  update(client: Clients) {
    const docRef = doc(
      this.firestore,
      `Clients/${client.id}`
    );
    return updateDoc(docRef, { ...client });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.clientsPath, id);
    return deleteDoc(docRef);
  }

}
