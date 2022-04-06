import { TodoStore } from './todo.store';
import { Injectable } from '@angular/core';

@Injectable()

export class TodoService {
  constructor(private _store: TodoStore) {}

  updateTodo(newTitle: string) {
    this._store.add({id: Math.random(), title: newTitle, completed: false});
    console.log(this._store)
  }
}
