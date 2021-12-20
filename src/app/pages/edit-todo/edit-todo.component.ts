import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/todo.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit, OnDestroy{
  post!: Post
  editForm!: FormGroup
  submited = false
  uSub?: Subscription

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params:Params) => {
        return this.postsService.getById(params['id'])
      })).subscribe((post: Post) => {
        this.post = post
        this.editForm = new FormGroup({
          text: new FormControl(post.text, Validators.required)
        })
    })
  }

  submit() {
    if(this.editForm.invalid){
      return
    }
    this.submited = true
    this.uSub = this.postsService.update({
      ...this.post,
      text: this.editForm.value.text
    }).subscribe(() => {
      this.submited = false
      this.router.navigateByUrl('/todo')
    })

  }

  ngOnDestroy(): void {
    if(this.uSub) {
      this.uSub.unsubscribe()
    }
  }
}
