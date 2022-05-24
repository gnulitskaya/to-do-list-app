import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../shared/interfaces";
import {ID} from "@datorama/akita";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-todo',
  styleUrls: ['./todo-page.component.scss'],
  template: `
    <mat-card>
    <li class="list__item">
      <div class='list__item-box'>
        <mat-checkbox class="list__checkbox" [formControl]="checkbox"></mat-checkbox>
        <ng-container>
          <span>{{todo.title}}</span>
        </ng-container>
<!--        <ng-template>-->
<!--          <input formControlName="titleEdit" #titleEdit matInput  placeholder="Edit todo" (keydown.enter)="saveEditTodo(titleEdit.value, todo.id);">-->
<!--        </ng-template>-->
      </div>

      <div class='list__item-box'>
<!--        <button (click)="editTodo(todo.id)" mat-fab color="primary" aria-label="Example icon button with a delete icon" class='list__edit'>-->
<!--          <mat-icon>edit</mat-icon>-->
<!--        </button>-->

        <button mat-fab color="warn" aria-label="Example icon button with a delete icon" (click)="onDeleteClick(todo.id)" class='list__remove'>
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </li>
      </mat-card>
  `,
})
export class TodoComponent implements OnInit{

  @Input() todo: Todo;

  @Output() delete : EventEmitter<ID>  = new EventEmitter<ID>();
  @Output() complete : EventEmitter<Todo> = new EventEmitter<Todo>();
  checkbox: FormControl;

  onDeleteClick(id: ID) {
    this.delete.emit(id);
  }

  ngOnInit(): void {
    this.checkbox = new FormControl(this.todo.completed);

    this.checkbox.valueChanges.subscribe((completed: boolean) => {
      this.complete.emit({ ...this.todo, completed });
    });
  }



}
