import { ID } from '@datorama/akita';
import { TodoStore } from './todo.store';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';
import { createTodo, Todo } from 'src/app/shared/interfaces';

@Injectable()

export class TodoService {
  constructor(private _store: TodoStore) {}

  addTodo(title: string) {
    const todo = createTodo({ id: Math.random(), title });
    this._store.add(todo);
    console.log(this._store)
  }

  removeTodo(id: ID) {
    this._store.remove(id);
    console.log(this._store);
  }

  updateStatus( id: ID, completed: boolean) {
    this._store.update(id, {
      completed
    });
  }

  // updateStatus(completed: boolean) {
  //   this._store.update(state => ({
  //     ...state,
  //     completed
  //   }));
  //   console.log(this._store);
  // }

  // setActive(id: ID) {
  //   this._store.setActive(id);
  //   console.log(this._store)
  // }
}
