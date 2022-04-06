import { Validators } from '@angular/forms';
import { Todo, TodoQuery } from './state/todo.store';
import { Observable } from 'rxjs';
import { TodoService } from './state/todo.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  todos$?: Observable<Todo[]> = this.todoQuery.selectAll();
  constructor(private todoService: TodoService, private todoQuery: TodoQuery) { }

  form = new FormGroup({
    title: new FormControl(null, Validators.required)
  })

  add(input: string) {
    this.todoService.updateTodo(input);
    // this.form.get('title')?.value = '';
  }

  ngOnInit() {

  }
}
