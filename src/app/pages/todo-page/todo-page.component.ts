import { takeUntil } from 'rxjs/operators';
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
  selectedEdit: ID | null = null;
  // displayedColumns: string[] = ['position', 'status', 'name', 'delete', 'edit'];
  // dataSource = new MatTableDataSource<Todo>();

  // active$?: Observable<ID>;

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  todos$: Observable<Todo[]> = this.todoQuery.todos$.pipe(takeUntil(this._destroy$));
  selectedTodo: Todo | null = null;
  constructor(private todoService: TodoService, private todoQuery: TodoQuery) { }

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    checkbox: new FormControl(null),
    titleEdit: new FormControl(null)
  })

  ngOnInit() {
    // this.active$ = this.todoQuery.selectActiveId();

    this.form.controls['checkbox']?.valueChanges.subscribe((completed: boolean) => {
      this.todoService.updateStatus(this.selectedTodo?.id || 0, completed );
    })

    // this.todoQuery.selectAll().pipe(
    //   takeUntil(this._destroy$)
    // ).subscribe(v => {
    //   this.dataSource.data = v as Todo[];
    // });

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

  delete(id: ID) {
    this.todoService.removeTodo(id);
  }

  saveEditTodo(titleEdit: string, id: ID) {
    this.todoService.editTitle(id || 0, titleEdit);
  }

  editTodo(id: ID): void {
    this.selectedEdit = id;
  }

  // setActive(id: ID) {
  //   this.todoService.setActive(id);
  // }

  // edit(id: number){
  //   this.isEditTodo = true;
  //   this.todoService.editText(id);
  // }

  ngOnDestroy(): void {
    this._destroy$.next()
    this._destroy$.complete();
  }

}
