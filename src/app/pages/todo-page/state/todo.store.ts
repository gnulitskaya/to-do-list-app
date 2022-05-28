import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, QueryEntity, ID } from '@datorama/akita';
import { Observable } from 'rxjs';

export interface Todo {
   id: string,
   title: string,
   completed: boolean
}

export interface TodosState extends EntityState<Todo> { }

@StoreConfig({ name: 'todo' })
@Injectable()
export class TodoStore extends EntityStore<TodosState> {
  constructor() {
    super();
  }
}

@Injectable()
export class TodoQuery extends QueryEntity<TodosState> {
  todos$: Observable<Todo[] | null> = this.selectAll();

  constructor(protected store: TodoStore) {
    super(store);
  }
}
