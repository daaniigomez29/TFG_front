import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { BooksService } from './services/books.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllBooksViewComponent } from './books/all-books-view/all-books-view.component';
import { OneBookViewComponent } from './books/one-book-view/one-book-view.component';
import { UserProfileViewComponent } from './users/user-profile-view/user-profile-view.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AuthUserService } from './services/auth-user.service';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ChatUserComponent } from './chat/chat-user/chat-user.component';
import { NavbarViewComponent } from './layout/navbar-view/navbar-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AllBooksViewComponent,
    OneBookViewComponent,
    UserProfileViewComponent,
    EditUserComponent,
    EditBookComponent,
    ChatUserComponent,
    NavbarViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [UsersService, BooksService, AuthUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
