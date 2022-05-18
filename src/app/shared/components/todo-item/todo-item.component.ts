import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})

export class TodoItemComponent implements OnInit {
  @Output() onRemove = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  remove(id: any) {
    this.onRemove.emit(id);
  }
}
