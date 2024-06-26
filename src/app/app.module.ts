import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmailValidator, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { BooksService } from './services/books.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AllBooksViewComponent } from './books/all-books-view/all-books-view.component';
import { OneBookViewComponent } from './books/one-book-view/one-book-view.component';
import { UserProfileViewComponent } from './users/user-profile-view/user-profile-view.component';
import { AuthUserService } from './services/auth-user.service';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { ChatUserComponent } from './chat/chat-user/chat-user.component';
import { NavbarViewComponent } from './layout/navbar-view/navbar-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BookCardComponent } from './books/book-card/book-card.component';
import { ImagesService } from './services/images.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FavoriteBooksService } from './services/booksFavorites.service';
import { AllUsersViewComponent } from './users/all-users-view/all-users-view.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AddBookComponent } from './books/add-book/add-book.component';
import { SearchService } from './services/searchService.service';
import { RequestsService } from './services/requests.service';
import { FriendsService } from './services/friends.service';
import { ChatService } from './services/chat.service';
import { UsernameValidatorService } from './validators/username-validator.service';
import { ValidatorService } from './validators/validator.service';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsernameRegisterValidatorService } from './validators/usernameRegister-validator.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AllBooksViewComponent,
    OneBookViewComponent,
    UserProfileViewComponent,
    EditBookComponent,
    ChatUserComponent,
    NavbarViewComponent,
    BookCardComponent,
    AllUsersViewComponent,
    UserCardComponent,
    AddBookComponent,
    EditUserComponent
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
  providers: [
    UsersService, BooksService, AuthUserService, ImagesService, FavoriteBooksService, SearchService, RequestsService, FriendsService, ChatService, EmailValidator, UsernameValidatorService, ValidatorService, UsernameRegisterValidatorService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
