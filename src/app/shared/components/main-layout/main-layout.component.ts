import { Observable, interval, Subject } from 'rxjs';
import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  clock$?: Observable<Date>;
  private _destroy$: Subject<void> = new Subject<void>();
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(private observer: BreakpointObserver) { }
  showFiller = true;
  date: Date = new Date();

  ngAfterViewInit() {
    setTimeout(() => this.observer.observe(['(max-width: 800px)']).pipe(
      takeUntil(this._destroy$)
    ).subscribe((res) => {
      if (res.matches) {
        this.drawer.mode = 'over';
        this.drawer.close();
      } else {
        this.drawer.mode = 'side';
        this.drawer.open();
      }
    }));
  }

  ngOnInit(): void {
    // this.
    this.clock$ = interval(1000).pipe(
      map( () => new Date() )
    );

  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('darkMode');
 }

 ngOnDestroy(): void {
  this._destroy$.next()
  this._destroy$.complete();
}

}
