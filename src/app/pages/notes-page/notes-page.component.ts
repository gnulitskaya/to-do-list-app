import { Observable, Subject } from 'rxjs';
import { NotesService } from './notes.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/interfaces';
import { NoteQuery } from './state/note.store';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})

export class NotesPageComponent implements OnInit {

  notes$?: Observable<Note[] | undefined> = this._query.selectAll();

  constructor(private noteService: NotesService, private _query: NoteQuery) {}
  formS = new FormGroup({
    title: new FormControl('')
  })


  add(input: HTMLInputElement) {
    this.noteService.add(input.value);
    input.value = '';
  }

  ngOnInit(): void {

  }
}
