import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { FavoriteBooksService } from '../../services/booksFavorites.service';
import { Book } from '../../interfaces/Book';
import Swal from 'sweetalert2';
import { read } from '@popperjs/core';
import { ImagesService } from '../../services/images.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit{

  idBook:number = -1
  imageUrl?: string | ArrayBuffer | null = null;
  imageFile: File | null = null


  book:Book ={
    id:this.idBook,
    name:"",
    nameAuthor:"",
    editorial:"",
    synopsis:"",
    genre:"",
    image:"" 
  }

  constructor(private bookService:BooksService, private router:Router, private route:ActivatedRoute, public authService:AuthUserService, private imagesService:ImagesService){
  }

  ngOnInit(): void {
    console.log(this.authService.getUserData().admin)
    this.idBook = this.route.snapshot.params['id']

    this.bookService.getBook(this.idBook).subscribe({
      next: data =>{
        this.book.id = data.id
        this.book.name = data.name;
        this.book.nameAuthor = data.nameAuthor;
        this.book.editorial = data.editorial;
        this.book.synopsis = data.synopsis;
        this.book.genre = data.genre;
        this.book.image = data.image;
        console.log(data.image)
      },
      error: err =>{
        console.error(err)
      }
    })
  }

  editBook(){
    let upload$ = of(null)
    if(this.imageFile != null){
      upload$ = this.imagesService.uploadImageCloudinary(this.imageFile).pipe(
        switchMap(data => {
          this.book.image = data.url;
          return of(null); // Retorna un observable nulo para continuar la cadena
        }),
        catchError(error => {
          console.error("Error al subir la imagen:", error);
          return of(null); // Manejo del error y continuar la cadena
        })
      );
    }
    
    upload$.pipe(
      switchMap(() => this.bookService.editBook(this.idBook, this.book)),
      catchError(err => {
        Swal.fire({
          title: "Libro no editado",
          text: "Ha habido un error: " + err.error.message,
          icon: "error",
          showConfirmButton: false
        });
        return of(null); // Manejo del error y finalizar la cadena
      })
    ).subscribe(response => {
      if (response) {
        Swal.fire({
          title: "Libro editado",
          text: "El libro ha sido editado correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigate(['home/books/', this.idBook])
      }
    });
  }

  back(){
    this.router.navigate(['home/books/', this.idBook])
  }

  obtainImage(event: Event){
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFile = file;
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file)
    }
  }
}
