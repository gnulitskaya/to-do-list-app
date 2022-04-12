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

  todos$: Observable<Todo[]> = this.todoQuery.todos$;
  
  constructor(private todoService: TodoService, private todoQuery: TodoQuery) { }

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    checkbox: new FormControl(false)
  })

  ngOnInit() {
    this.form.get('checkbox')?.valueChanges.subscribe((done: boolean) => {
      this.todoService.updateStatus(done);
    })
  }

  add(input: string) {
    if(this.form.get('title')?.value !== '') {
      this.todoService.addTodo(input);
      this.form.get('title')?.reset();
    }
  }

  update(checked: boolean) {
    this.todoService.updateStatus(checked);
  }

  delete(id: number) {
    this.todoService.removeTodo(id);
  }

}
