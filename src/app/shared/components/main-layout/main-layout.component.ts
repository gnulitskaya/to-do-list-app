import { Observable, interval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  clock$?: Observable<Date>;
  constructor() { }
date: Date = new Date();
  ngOnInit(): void {
    // this.
    this.clock$ = interval(1000).pipe(
      map( () => new Date() )
      );
  }

}
