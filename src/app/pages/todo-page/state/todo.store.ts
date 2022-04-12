import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

export interface Todo {
   id: number,
   title: string | null,
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
  todos$: Observable<Todo[]> = this.selectAll();
  
  constructor(protected store: TodoStore) {
    super(store);
  }
}
