import { TodoService } from './../todo-page/state/todo.service';
import { Todo, TodoStore, TodoQuery } from './../todo-page/state/todo.store';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit, OnDestroy{
  route: any;
  todo?: Todo
  form!: FormGroup
  constructor(private _query: TodoQuery, private todoService: TodoService) { }

  ngOnInit(): void {

  }

  submit() {
    // if(this.editForm.invalid){
    //   return
    // }
    // this.submited = true
    // this.uSub = this.postsService.update({
    //   ...this.post,
    //   text: this.editForm.value.text
    // }).subscribe(() => {
    //   this.submited = false
    //   this.router.navigateByUrl('/todo')
    // })

  }

  ngOnDestroy(): void {
    // if(this.uSub) {
    //   this.uSub.unsubscribe()
    // }
  }
}
