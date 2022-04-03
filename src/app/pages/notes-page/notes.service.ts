import { Injectable } from '@angular/core';
import { createNote } from 'src/app/shared/interfaces';
import { NoteStore } from './state/note.store';

@Injectable({providedIn: 'root'})

export class NotesService {
  constructor(private _store: NoteStore) {}

  add(title: string) {
    const note = createNote({id: Math.random(), title, checked: false});
    this._store.add(note);
    console.log(this._store);
  }
}
