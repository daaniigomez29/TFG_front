import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../interfaces/Book';
import { UsersService } from '../../services/users.service';
import { AuthUserService } from '../../services/auth-user.service';
import { FavoriteBooksService } from '../../services/booksFavorites.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-one-book-view',
  templateUrl: './one-book-view.component.html',
  styleUrl: './one-book-view.component.css'
})
export class OneBookViewComponent implements OnInit{

  idBook:number = -1
  idFavorite:number = -1

  book:Book ={
    id:this.idBook,
    name:"",
    nameAuthor:"",
    editorial:"",
    synopsis:"",
    genre:"",
    image:"" 
  }

  constructor(private bookService:BooksService, private router:Router, private route:ActivatedRoute, public authService:AuthUserService, private favoriteService:FavoriteBooksService){
  }

  ngOnInit(): void {
    console.log(this.authService.getUserData().admin)
    this.idBook = this.route.snapshot.params['id']

    this.bookService.getBook(this.idBook).subscribe({
      next: data =>{
        this.book.name = data.name;
        this.book.nameAuthor = data.nameAuthor;
        this.book.editorial = data.editorial;
        this.book.synopsis = data.synopsis;
        this.book.genre = data.genre;
        this.book.image = data.image;
      },
      error: err =>{
        console.error(err)
      }
    })

    this.favoriteService.findByUserIdAndBookId(this.authService.getUserData().id, this.idBook).subscribe({
      next: data => {
        this.idFavorite = data
      },
      error: err =>{
        console.error(err)
      }
    })
  }

  addFavorites(){
    this.favoriteService.addFavoriteBook(this.authService.getUserData().id, this.idBook).subscribe({
      next: data =>{
        Swal.fire({
          title: "Libro añadido",
          text: "El libro ha sido añadido a favoritos correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/books/", this.idBook])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Libro no añadido",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  deleteFavorites(){
    this.favoriteService.deleteFavoriteBook(this.authService.getUserData().id, this.idBook).subscribe({
      next: data =>{
        Swal.fire({
          title: "Libro eliminado",
          text: "El libro ha sido eliminado de favoritos correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
          this.router.navigate(["/home/books/", this.idBook])
        })
      },
      error: err =>{
        Swal.fire({
          title: "Libro no eliminado",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }

  deleteBook(){
    Swal.fire({
      title: "¿Estás seguro?",
      icon: 'warning',
      text: "El libro será eliminado para siempre",
      confirmButtonText:"Confirmar",
      confirmButtonColor: "red",
      cancelButtonColor: "grey",
      cancelButtonText:"Cancelar",
      showCancelButton: true
    }).then((result) =>{
      if(result.isConfirmed){
        this.bookService.deleteBook(this.idBook).subscribe({
          next: data =>{
            Swal.fire({
              title: "Libro eliminado",
              text: "El libro ha sido eliminado correctamente",
              icon: "success",
              showConfirmButton: false
            });
            this.router.navigateByUrl("/home/books")
          }, error: err =>{
            Swal.fire({
              title: "Libro no eliminado",
              text: "Ha habido un error: " + err.error.message,
              icon: "error",
              showConfirmButton: false
            });
          }
        })
      }
    })
  }
}
