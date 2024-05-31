import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { ImagesService } from '../../services/images.service';
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrl: './user-profile-view.component.css'
})
export class UserProfileViewComponent implements OnInit{

  idUser:number = -1

  user:User = {
    id: -1,
    email: "",
    nameuser: "",
    name: "",
    image: "",
    friends: [],
    admin: this.authService.getUserData().admin
  }

  constructor(private bookService:BooksService, private router:Router, private route:ActivatedRoute, public authService:AuthUserService, private imagesService:ImagesService, private userService:UsersService){
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id']
    console.log(this.idUser)
    this.userService.getUser(this.idUser).subscribe({
      next: data =>{
        this.user.id = data.id
        this.user.email = data.email;
        this.user.nameuser = data.nameuser;
        this.user.name = data.name;
        this.user.image = data.image;
        this.user.friends = data.friends;
      }
    })
  }
}
