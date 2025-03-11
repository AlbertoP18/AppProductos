import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [

{path: 'adminpage', component: AdminComponent, title: 'admin page'},

{path: 'userpage', component: UserComponent, title: 'user page'},

{path: 'loginpage', component: LoginComponent, title: 'login page'},

{path: '**', redirectTo: 'loginpage', pathMatch: 'full'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }