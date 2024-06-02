import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/User';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/searchService.service';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-all-users-view',
  templateUrl: './all-users-view.component.html',
  styleUrl: './all-users-view.component.css'
})
export class AllUsersViewComponent implements OnInit, OnDestroy{

  users:User[] = []
  usersSearched:User[] = []
  p:number = 1

  private searchSubscription!: Subscription;

  constructor(private usersService:UsersService, public searchService:SearchService, private authService:AuthUserService){}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: data =>{
        this.users = data.filter(user =>
          user.nameuser != this.authService.getUserData().nameuser
        )
        this.usersSearched = this.users
        this.searchBook()
      }
    })
  }

  searchBook(){
    this.searchSubscription = this.searchService.currentSearchTerm.subscribe(term => {
      this.usersSearched = this.users.filter(user =>
        user.nameuser.toLowerCase().startsWith(term.toLowerCase())
      );
    });
  }

  ngOnDestroy(): void {
    if(this.searchSubscription){
      this.searchSubscription.unsubscribe();      
    }
  }
}
