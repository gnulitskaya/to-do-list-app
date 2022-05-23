import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../shared/interfaces";
import {ID} from "@datorama/akita";

@Component({
  selector: 'app-todos',
  template: `
    <ul class='todo-list list'>
      <mat-card>
        <app-todo *ngFor="let todo of todos"
                  (delete)="delete.emit($event)"
                  [todo]="todo"></app-todo>
      </mat-card>
    </ul>
  `,
})
export class TodosComponent {
  @Input() todos: Todo[] | null;

  @Output() delete = new EventEmitter<ID>();
}
