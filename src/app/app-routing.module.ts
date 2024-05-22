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

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: NavbarViewComponent,
    children: [
      {path: 'user/:id', component: UserProfileViewComponent, canMatch:[authGuard]},
      {path: 'user/edit/:id', component: EditUserComponent, canMatch:[authGuard]},
      {path: 'books', component: AllBooksViewComponent, canMatch:[authGuard]},
      {path: 'books/:id', component: OneBookViewComponent, canMatch:[authGuard]}
    ]
  },
  {path: 'chat', component: ChatUserComponent, canMatch:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
