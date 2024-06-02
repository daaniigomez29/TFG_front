import { Component } from '@angular/core';
import { Book } from '../../interfaces/Book';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { BooksService } from '../../services/books.service';
import { ImagesService } from '../../services/images.service';
import { of, switchMap, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  form!: FormGroup;

  imageUrl?: string | ArrayBuffer | null = null;
  imageFile: File | null = null


  book: Book = {
    id: -1,
    name: "",
    nameAuthor: "",
    editorial: "",
    synopsis: "",
    genre: "",
    image: ""
  }

  constructor(private bookService: BooksService, private router: Router, private route: ActivatedRoute, public authService: AuthUserService, private imagesService: ImagesService, private fb: FormBuilder) {
  }

  addBook() {
    if (this.imageUrl == null) {
      Swal.fire({
        title: "Libro no añadido",
        text: "Tienes que añadir una imagen",
        icon: "error",
        showConfirmButton: false
      });
    } else {
      let upload$ = of(null)
      if (this.imageFile != null) {
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
        switchMap(() => this.bookService.addBook(this.book)),
        catchError(err => {
          Swal.fire({
            title: "Libro no añadido",
            text: "Ha habido un error: " + err.error.message,
            icon: "error",
            showConfirmButton: false
          });
          return of(null); // Manejo del error y finalizar la cadena
        })
      ).subscribe(response => {
        if (response) {
          Swal.fire({
            title: "Libro añadido",
            text: "El libro ha sido añadido correctamente",
            icon: "success",
            showConfirmButton: false
          });
          this.router.navigate(['home/books'])
        }
      });
    }
  }

  back() {
    this.router.navigate(['home/books'])
  }

  obtainImage(event: Event) {
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
