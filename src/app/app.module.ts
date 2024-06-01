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
import { RouterLink } from '@angular/router';
import { BookCardComponent } from './books/book-card/book-card.component';
import { ImagesService } from './services/images.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FavoriteBooksService } from './services/booksFavorites.service';
import { AllUsersViewComponent } from './users/all-users-view/all-users-view.component';
import { UserCardComponent } from './users/user-card/user-card.component';

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
    NavbarViewComponent,
    BookCardComponent,
    AllUsersViewComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterLink
  ],
  providers: [UsersService, BooksService, AuthUserService, ImagesService, FavoriteBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
