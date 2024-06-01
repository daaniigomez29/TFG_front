import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserProfileViewComponent } from './users/user-profile-view/user-profile-view.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AllBooksViewComponent } from './books/all-books-view/all-books-view.component';
import { OneBookViewComponent } from './books/one-book-view/one-book-view.component';
import { authGuard } from './guardians/auth-guardian';
import { NavbarViewComponent } from './layout/navbar-view/navbar-view.component';
import { ChatUserComponent } from './chat/chat-user/chat-user.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AllUsersViewComponent } from './users/all-users-view/all-users-view.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component: NavbarViewComponent, canMatch:[authGuard],
    children: [
      {path: 'users/:id', component: UserProfileViewComponent, canMatch:[authGuard]},
      {path: 'users/:id/edit', component: EditUserComponent, canMatch:[authGuard]},
      {path: 'users', component: AllUsersViewComponent, canMatch:[authGuard]},
      {path: 'books', component: AllBooksViewComponent, canMatch:[authGuard]},
      {path: 'books/:id', component: OneBookViewComponent, canMatch:[authGuard]},
      {path: 'books/:id/edit', component: EditBookComponent, canMatch:[authGuard]}
    ]
  },
  {path: 'chat', component: ChatUserComponent, canMatch:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
