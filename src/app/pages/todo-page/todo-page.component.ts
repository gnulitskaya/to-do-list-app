import { map, takeUntil, filter } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { Todo, TodoQuery } from './state/todo.store';
import { Observable, Subject } from 'rxjs';
import { TodoService } from './state/todo.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  todos$: Observable<Todo[] | null> = this.todoQuery.todos$.pipe(
    takeUntil(this._destroy$));

  selectedTodo: Todo | null = null;
  selectedEdit: ID | null = null;
  constructor(private todoService: TodoService, private todoQuery: TodoQuery) { }

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    checkbox: new FormControl(null),
    titleEdit: new FormControl(null)
  })

  ngOnInit() {

    // this.form.controls['checkbox']?.valueChanges.subscribe((completed: boolean) => {
    //   this.todoService.updateStatus(this.selectedTodo?.id || 0, completed );
    // })

  }

  onSelectTodo(todo: Todo): void {
    this.selectedTodo = todo;
  }

  add(input: string) {
    //when the given input is non-blank
    input = input.trim();
    if (!input) { return; }
      this.todoService.addTodo(input);
      this.form.get('title')?.reset();
  }

  delete(id: string) {
    this.todoService.removeTodo(id);
  }

  saveEditTodo(todo: Todo) {
    this.todoService.editTitle(todo);
    // this.form.get('titleEdit')?.reset();
    // this.selectedEdit = null;
  }

  complete(todo: Todo) {
    this.todoService.updateStatus(todo);
  }

  editTodo(id: string): void {
    this.selectedEdit = id;
    this.form.get('titleEdit')?.reset();
  }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete();
  }

}
