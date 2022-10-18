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
  query,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

import { Site } from 'src/app/sites/shared';

@Injectable({
  providedIn: 'any'
})
export class SiteService {
  private SiteCollectionRef!: CollectionReference<DocumentData>;
  path: string = 'Sites';
  id: string = 'relative_id'

  constructor(private readonly firestore: Firestore) {
    this.SiteCollectionRef = collection(this.firestore, this.path);
  }

  getAll() {
    return collectionData(this.SiteCollectionRef, {
      idField: 'id'
    }) as Observable<Site[]>
  }

  get(id: string) {
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where('id', '==', String(id)));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  search(id: string) {
    const detailRef = collection(this.firestore, this.path);
    const q = query(detailRef, where(`${this.id}`, '==', String(id)));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
  }

  create(site$: Site) {
    try {
      addDoc(this.SiteCollectionRef, site$);
    } catch (err) {
      console.error("Error: writeToDB failed. Reason :", err)
    }
  }

  update(data: Site) {
    const docRef = doc(
      this.firestore,
      `${this.path}/${data.id}`
    );
    return updateDoc(docRef, { ...data });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, this.path, id);
    return deleteDoc(docRef);
  }

}
