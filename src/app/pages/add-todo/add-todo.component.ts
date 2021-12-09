import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/todo.service";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<string>();

  form: FormGroup  = new FormGroup({
    text: new FormControl(null, Validators.required)
  })
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.form.valid) {
      this.onSubmit.emit(this.form.controls.text.value);
      this.form.reset();
    }
  }

}
