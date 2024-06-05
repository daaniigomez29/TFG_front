import { Component } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import Swal from 'sweetalert2';
import { ImagesService } from '../../services/images.service';
import { catchError, of, switchMap } from 'rxjs';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidatorService } from '../../validators/username-validator.service';
import { EmailValidatorService } from '../../validators/email-validator.service';
import { ValidatorService } from '../../validators/validator.service';
import { UsernameRegisterValidatorService } from '../../validators/usernameRegister-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  input = document.getElementById("image") as HTMLInputElement;
  imageFile: File | null = null

  registerRequest: RegisterRequest = {
    email: "",
    nameuser: "",
    password: "",
    name: "",
    image: "",
    admin: true
  }


  constructor(private authService: AuthUserService, private router: Router, private imagesService: ImagesService, private fb: FormBuilder, private emailValidator: EmailValidatorService, private validatorService:ValidatorService, private usernameRegisterValidator: UsernameRegisterValidatorService) { }


  formUser: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(/^[A-Za-z0-9+_.-]+@(.+)$/), this.validatorService.patternEmail], [this.emailValidator]],
    username: ["", [Validators.required], [this.usernameRegisterValidator]],
    name: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.pattern(/^.{5,}$/)]]
  });

  noValid(field: string): boolean {
    return this.formUser?.controls[field]?.invalid && this.formUser?.controls[field]?.touched
  }

  get emailError(): string {
    const errors = this.formUser.get('email')?.errors
    let msg: string = ""
    if (errors) {
      if (errors['required']) {
        msg = "El Email es necesario"
      } else if (errors["noValidEmail"]) {
        msg = "Formato de email necesario (ejemplo@gmail.com)"
      } else if (errors["emailTaken"]) {
        msg = "Este correo no está disponible"
      }
    }
    return msg;
  }

  // Función para obtener mensajes de error del campo de contraseña
  get passwordError(): string {
    const errors = this.formUser.get('password')?.errors
    let msg: string = ""
    if (errors) {
      if (errors['required']) {
        msg = "La contraseña es necesaria"
      } else if (errors["pattern"]) {
        msg = "La contraseña tiene que tener 5 caracteres mínimo"
      }
    }
    return msg;
  }

  // Función para obtener mensajes de error del campo DAS
  get usernameError(): string {
    const errors = this.formUser.get('username')?.errors
    let msg: string = ""
    if (errors) {
      if (errors['required']) {
        msg = "El nombre de usuario es necesario"
      } else if (errors["usernameTaken"]) {
        msg = "El nombre de usuario no está disponible"
      }
    }
    return msg;
  }


  register() {
    this.formUser.markAllAsTouched()
    if (this.formUser.valid) {
      this.registerRequest.email = this.formUser.value.email;
      this.registerRequest.nameuser = this.formUser.value.username;
      this.registerRequest.name = this.formUser.value.name;
      this.registerRequest.password = this.formUser.value.password;

      let upload$ = of(null)
      if (this.imageFile != null) {
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
  }

  obtainImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFile = file
    }
  }
}
