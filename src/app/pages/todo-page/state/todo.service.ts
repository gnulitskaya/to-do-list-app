import { ID } from '@datorama/akita';
import { TodoStore } from './todo.store';
import { Injectable } from '@angular/core';
import { state } from '@angular/animations';
import { createTodo, Todo } from 'src/app/shared/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable()

export class TodoService {
  todoCollection: AngularFirestoreCollection;
  constructor(private _store: TodoStore, private afs: AngularFirestore ) {
    this.todoCollection = afs.collection('todo');
    this.fetch();
  }

  fetch() {
    this.todoCollection.valueChanges().subscribe((todo: any[]) => {
      this._store.set(todo);
    });
  }

  addTodo(title: string) {
    const completed = false;
    const id = this.afs.createId();
    const todo = { id, title, completed }
    // const todo = createTodo({ id: Math.random(), title });
    this.todoCollection.doc(id).set(todo).then(res => {
      this._store.add(createTodo(todo));
    });

    console.log(this._store)
  }

  removeTodo(id: string) {
    this.todoCollection.doc(id).delete().then((res) => {
      this._store.remove(id);
    });

    console.log(this._store);
  }

  updateStatus( {id, completed}: Todo) {
    this.todoCollection.doc(id).update({completed}).then((res) => {
      this._store.update(id, {
        completed
      });
    });

  }

  editTitle({id, title}: Todo) {
    this.todoCollection.doc(id).update({title}).then((res) => {
      this._store.update(id, {
        title
      });
    });

  }
}
