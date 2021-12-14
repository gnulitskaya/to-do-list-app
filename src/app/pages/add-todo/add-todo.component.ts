import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/todo.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  // @Output() onSubmit = new EventEmitter<string>();
  posts: Post[] = []
  form: FormGroup  = new FormGroup({
    text: new FormControl(null, Validators.required)
  })
  constructor(private postsService: PostsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.form.valid) {
      const post: Post = {
        text: this.form.value.text,
        date: new Date(),
        completed: false
      }

      this.postsService.create(post).subscribe( () => {
        this.posts.push(post);
        this.router.navigateByUrl('/todo');
      })

      console.log(post)
    }
  }

}
