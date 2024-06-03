import { Component } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import Swal from 'sweetalert2';
import { ImagesService } from '../../services/images.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  input = document.getElementById("image") as HTMLInputElement;
  imageFile: File | null = null

  registerRequest:RegisterRequest = {
    email: "",
    nameuser: "",
    password: "",
    name: "",
    image: "",
    admin: true
  }

  validator(){
    
  }

  constructor(private authService:AuthUserService, private router:Router, private imagesService:ImagesService){}

  register(){
    let upload$ = of(null)
    if(this.imageFile != null){
      upload$ = this.imagesService.uploadImageCloudinary(this.imageFile).pipe(
        switchMap(data => {
          this.registerRequest.image = data.url;
          return of(null); // Retorna un observable nulo para continuar la cadena
        }),
        catchError(error => {
          console.error("Error al subir la imagen:", error);
          return of(null); // Manejo del error y continuar la cadena
        })
      );
    }
    
    upload$.pipe(
      switchMap(() => this.authService.register(this.registerRequest)),
      catchError(error => {
        Swal.fire({
          title: "Incorrecto",
          text: "Registro fallido: " + error.error.message,
          icon: "error",
          showConfirmButton: false
        });
        return of(null); // Manejo del error y finalizar la cadena
      })
    ).subscribe(response => {
      if (response) {
        Swal.fire({
          title: "Correcto",
          text: "Cuenta creada correctamente",
          icon: "success",
          showConfirmButton: false
        });
        this.router.navigateByUrl("/login");
      }
    });
  }

  obtainImage(event: Event){
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFile = file
    }
  }
}
