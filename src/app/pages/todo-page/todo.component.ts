import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../shared/interfaces";
import {ID} from "@datorama/akita";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-todo',
  styleUrls: ['./todo-page.component.scss'],
  template: `
    <form [formGroup]="todoForm">
      <mat-card>
    <li class="list__item">
      <div class='list__item-box'>
        <mat-checkbox class="list__checkbox" [formControl]="checkbox"></mat-checkbox>
        <ng-container *ngIf="selectedEdit !== todo.id; else editText">
          <span>{{todo.title}}</span>
        </ng-container>
        <ng-template #editText>
          <input matInput placeholder="Edit todo" formControlName="titleEdit" >
<!--          <span>edit</span>-->
        </ng-template>
      </div>

      <div class='list__item-box'>
        <button (click)="onEditClick(todo.id)" mat-fab color="primary" aria-label="Example icon button with a delete icon" class='list__edit'>
          <mat-icon>edit</mat-icon>
        </button>

        <button mat-fab color="warn" aria-label="Example icon button with a delete icon" (click)="onDeleteClick(todo.id)" class='list__remove'>
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </li>
      </mat-card>
    </form>
  `,
})
export class TodoComponent implements OnInit{

  @Input() todo: Todo;

  @Output() delete : EventEmitter<ID>  = new EventEmitter<ID>();
  @Output() complete : EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() edit: EventEmitter<ID> = new EventEmitter<ID>();

  checkbox: FormControl;

  selectedEdit: ID | null = null;

  onDeleteClick(id: ID) {
    this.delete.emit(id);
  }
  onEditClick(id: ID) {
    this.edit.emit(id);
    this.selectedEdit = id;
  }

  todoForm!: FormGroup;

  ngOnInit(): void {
    this.checkbox = new FormControl(this.todo.completed);

    this.todoForm = new FormGroup({
      titleEdit: new FormControl(this.todo.title),
    })

    this.checkbox.valueChanges.subscribe((completed: boolean) => {
      this.complete.emit({ ...this.todo, completed });
    });
  }


}
