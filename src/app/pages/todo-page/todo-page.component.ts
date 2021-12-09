import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../shared/todo.service";
import {Post} from "../../shared/interfaces";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {


  constructor(private postsService: PostsService) { }
  posts: Post[] = []
  dSub?: Subscription

  ngOnInit() {
    this.postsService.getAll()
      .subscribe(posts => this.posts = posts);
  }

  onSubmit(text: string) {
    const post: Post = {
      text,
      date: new Date(),
      completed: false
    }

    this.postsService.create(post).subscribe( () => {
      this.posts.push(post);
    })
    console.log(post)
  }

  onRemove(id: any) {
    this.dSub = this.postsService.remove(id).subscribe( () => {
      //переопределение списка постов
      //удалим ненужный элемент из массива
      this.posts = this.posts.filter(post => post.id !== id)

    })
  }

}
