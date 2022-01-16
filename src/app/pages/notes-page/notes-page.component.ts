import { Component, OnInit } from '@angular/core';
import {Note, Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NoteService} from "../../shared/note.service";

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss']
})
export class NotesPageComponent implements OnInit {
  form: FormGroup  = new FormGroup({
    text: new FormControl(null, Validators.required)
  })
  notes: Note[] = []
  constructor(private notesService: NoteService) { }

  ngOnInit(): void {
    this.notesService.getAll()
      .subscribe(notes => this.notes = notes);
  }


  submit() {
    if(this.form.valid) {
      const note: Note = {
        text: this.form.value.text,
        date: new Date()
      }

      this.notesService.create(note).subscribe( () => {
        this.notes.push(note);

      })

      console.log(note)
    }
  }
}
