import { Note } from './../../../shared/interfaces';
import { EntityState, EntityStore, Query, QueryEntity, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface NoteState extends EntityState<Note> {}

@StoreConfig({name: 'notes'})
export class NoteStore extends EntityStore<NoteState> {
  constructor() {
    super();
  }
}

@Injectable({providedIn: 'root'})
export class NoteQuery extends QueryEntity<NoteState> {
  constructor(protected store: NoteStore) {
    super(store);
  }

  //for clickTime
  getLastEntity(): Observable<Note | undefined> {
    return this.selectLast();
  }

}
