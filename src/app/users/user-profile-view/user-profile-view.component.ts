import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { ImagesService } from '../../services/images.service';
import { User } from '../../interfaces/User';
import { UsersService } from '../../services/users.service';
import { RequestsService } from '../../services/requests.service';
import { FriendsService } from '../../services/friends.service';
import Swal from 'sweetalert2';
import { FavoriteBooksService } from '../../services/booksFavorites.service';
import { Book } from '../../interfaces/Book';
import { FavoriteBook } from '../../interfaces/FavoriteBook';
import { RequestFriendship } from '../../interfaces/RequestFriendship';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrl: './user-profile-view.component.css'
})
export class UserProfileViewComponent implements OnInit{

  idUser:number = -1

  idRequest:number = -1

  idReceiver:number = -1

  requestsReceive:RequestFriendship[] = []

  friends:User[] = []

  favoriteBooks:FavoriteBook[] = []

  isFriend:boolean = false

  user:User = {
    id: -1,
    email: "",
    nameuser: "",
    name: "",
    image: "",
    friends: [],
    admin: this.authService.getUserData().admin
  }

  constructor(private bookService:BooksService, private router:Router, private route:ActivatedRoute, public authService:AuthUserService, private imagesService:ImagesService, private userService:UsersService,
    private requestsService:RequestsService, private friendsService:FriendsService, private favoriteServices:FavoriteBooksService
  ){
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id']
    this.userService.getUser(this.idUser).subscribe({
      next: data =>{
        this.user.id = data.id
        this.user.email = data.email;
        this.user.nameuser = data.nameuser;
        this.user.name = data.name;
        this.user.image = data.image;
        this.user.friends = data.friends;
        if(this.user.nameuser != this.authService.getUserData().nameuser){
          this.getRequest()
          this.getSender()
        } else{
          this.getRequestsFromUser()
        }
        this.getFriends()
      }
    })
    this.getFavoriteBooksFromUser()
  }

  getRequestsFromUser(){
    this.requestsService.findRequests(this.authService.getUserData().id).subscribe({
      next: data =>{
        this.requestsReceive = data
      }
    })
  }

  getFriends(){
    this.userService.getFriends(this.authService.getUserData().id).subscribe({
      next: data =>{
        this.friends = data

        data.forEach(user =>{
          if(user.nameuser == this.user.nameuser){
            this.isFriend = true
          }
        })
      }
    })
  }

  getRequest(){
    if(this.user.nameuser != this.authService.getUserData().nameuser){
      this.requestsService.findRequestByUserRequestAndUserReceive(this.user.id, this.authService.getUserData().id).subscribe({
        next: data =>{
          this.idRequest = data
        }
      })
    }
  }

  getSender(){
    if(this.user.nameuser != this.authService.getUserData().nameuser){
      this.requestsService.findRequestByUserRequestAndUserReceive(this.authService.getUserData().id, this.user.id).subscribe({
        next: data =>{
          this.idReceiver = data
        }
      })
    }
  }

  sendRequest(){
    this.requestsService.addRequest(this.authService.getUserData().id, this.idUser).subscribe({
      next: data =>{
        Swal.fire({
          title: "Solicitud enviada",
          text: "Solicitud de amistad enviada correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/users/", this.idUser])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Solicitud de amistad no enviada",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  deleteRequest(){
    this.requestsService.deleteRequest(this.authService.getUserData().id, this.idUser).subscribe({
      next: data =>{
        Swal.fire({
          title: "Solicitud eliminada",
          text: "Solicitud de amistad eliminada correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/users/", this.idUser])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Solicitud de amistad no eliminada",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  declineRequest(){
    this.requestsService.deleteRequest(this.user.id, this.authService.getUserData().id).subscribe({
      next: data =>{
        Swal.fire({
          title: "Solicitud rechazada",
          text: "Solicitud de amistad rechazada correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/users/", this.idUser])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Solicitud de amistad no rechazada",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  acceptRequest(){
    this.friendsService.addFriend(this.user.id, this.authService.getUserData().id).subscribe({
      next: data =>{
        Swal.fire({
          title: "Solicitud aceptada",
          text: "Solicitud de amistad aceptada correctamente, ahora sois amigos",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/users/", this.idUser])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Solicitud de amistad no aceptada",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  deleteFriend(){
    this.friendsService.deleteFriend(this.user.id, this.authService.getUserData().id).subscribe({
      next: data =>{
        Swal.fire({
          title: "Amistad eliminada",
          text: "Amistad eliminada correctamente, ahora no sois amigos",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/users/", this.idUser])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Amistad no eliminada",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  getFavoriteBooksFromUser(){
      this.favoriteServices.getAllFavoriteBooks(this.idUser).subscribe({
        next: data =>{
          this.favoriteBooks = data
        }
      })
  }

  goToChat(){
    this.router.navigate(["/home/chat/", this.idUser])
  }

}
