import { TodoStore } from './todo.store';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';

@Injectable()

export class TodoService {
  constructor(private _store: TodoStore) {}

  addTodo(newTitle: string) {
    this._store.add({id: Math.random(), title: newTitle, completed: false});
    console.log(this._store)
  }

  updateStatus(newStatus: boolean) {
    this._store.update({completed: newStatus});
    console.log(this._store)
  }

  removeTodo(id: number) {
    this._store.remove(id);
  }
}
