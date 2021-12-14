import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../interfaces";
import {PostsService} from "../../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})

export class TodoItemComponent implements OnInit {
  @Output() onRemove = new EventEmitter<any>();
  @Input() post!: Post

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  remove(id: any) {
    this.onRemove.emit(id);
  }
  onToggle(post: Post) {
    // Toggle in UI
    post.completed = !post.completed;
    // Toggle on server
    this.postsService.toggleCompleted(post).subscribe(post => console.log(post));
  }

}
