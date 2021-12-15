import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {registerLocaleData} from "@angular/common";
import ruLocale from '@angular/common/locales/ru';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { NotesPageComponent } from './pages/notes-page/notes-page.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { TodoItemComponent } from './shared/components/todo-item/todo-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { EditTodoComponent } from './pages/edit-todo/edit-todo.component';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TabsComponent,
    NotesPageComponent,
    TodoPageComponent,
    BookmarksPageComponent,
    AccountPageComponent,
    TodoItemComponent,
    AddTodoComponent,
    EditTodoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
