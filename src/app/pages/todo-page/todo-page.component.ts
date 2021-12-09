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
  form: FormGroup  = new FormGroup({
    text: new FormControl(null, Validators.required)
  })
  constructor(private postsService: PostsService) { }
  posts: Post[] = []
  dSub?: Subscription

  // posts$?: Observable<Post[]>
  ngOnInit() {
    this.postsService.getAll()
      .subscribe(posts => this.posts = posts);
  }

  submit() {
    if (this.form.invalid){
      return
    }

    const post: Post = {
      text: this.form.value.text,
      date: new Date(),
      completed: false
    }

    this.postsService.create(post).subscribe( () => {
      this.form.reset();
      this.posts.push(post);
      // this.posts$ = this.postsService.getAll()
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

// ngOnInit() {
//   this.dateService.date.pipe(
//     switchMap(value => this.tasksService.load(value))
//   ).subscribe(tasks => {
//     this.tasks = tasks
//   })
//
// }
//
// submit() {
//   const {title} = this.form.value
//
//   const task: Task = {
//     title,
//     date: this.dateService.date.value.format('DD-MM-YYYY')
//   }
//
//   this.tasksService.create(task).subscribe(task => {
//     this.tasks.push(task)
//     this.form.reset()
//   }, err => console.error(err))
// }
