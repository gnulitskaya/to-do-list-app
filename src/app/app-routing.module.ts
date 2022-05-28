import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {TodoPageComponent} from "./pages/todo-page/todo-page.component";
import {AccountPageComponent} from "./pages/account-page/account-page.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children:
      [
      {path:'', redirectTo: '/', pathMatch: 'full'},
      {path: 'todo', component: TodoPageComponent},
      {path: 'account', component: AccountPageComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
