import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { ImagesService } from '../../services/images.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidatorService } from '../../validators/username-validator.service';
import { of, switchMap, catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  idUser:number = -1
  imageUrl?: string | ArrayBuffer | null = null;
  imageFile: File | null = null

  user:User = {
    id: -1,
    email: "",
    nameuser: "",
    name: "",
    image: "",
    friends: [],
    admin: this.authService.getUserData().admin
  }

  constructor(private router:Router, private route:ActivatedRoute, public authService:AuthUserService, private imagesService:ImagesService, private userService:UsersService, private fb:FormBuilder,
    private usernameValidator:UsernameValidatorService
  ){
  }

  formUser: FormGroup = this.fb.group({
    username: ["", [Validators.required], [this.usernameValidator]],
    name: ["", [Validators.required]],
    email:["", {disabled: true}]
  });

  noValid(field: string): boolean {
    return this.formUser?.controls[field]?.invalid && this.formUser?.controls[field]?.touched
  }

  get usernameError(): string{
    const errors = this.formUser.get('username')?.errors
    let msg = ""
    if(errors){
      if(errors['required']){
        msg = "El nombre de usuario es necesario"
      }
      if(errors['usernameTaken']){
        msg = "El nombre de usuario no está disponible"
      }
    }
    return msg
  }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id']
    this.userService.getUser(this.idUser).subscribe({
      next: data =>{
        this.user.id = data.id
        this.user.email = data.email;
        this.user.image = data.image;
        this.user.friends = data.friends;

        this.formUser.patchValue({
          username: data.nameuser,
          name: data.name,
          email: data.email
        })
      }
    })
  }


  editProfile(){
    this.formUser.markAsTouched();
    if(this.formUser.valid){
      this.user.email = this.formUser.value.email;
      this.user.nameuser = this.formUser.value.username;
      this.user.name = this.formUser.value.name;

      let upload$ = of(null)
      if (this.imageFile != null) {
        upload$ = this.imagesService.uploadImageCloudinary(this.imageFile).pipe(
          switchMap(data => {
            this.user.image = data.url;
            return of(null); // Retorna un observable nulo para continuar la cadena
          }),
          catchError(error => {
            console.error("Error al subir la imagen:", error);
            return of(null); // Manejo del error y continuar la cadena
          })
        );
      }

      upload$.pipe(
        switchMap(() => this.userService.editUser(this.idUser, this.user)),
        catchError(error => {
          Swal.fire({
            title: "Incorrecto",
            text: "Error al editar: " + error.error.message,
            icon: "error",
            showConfirmButton: false
          });
          return of(null); // Manejo del error y finalizar la cadena
        })
      ).subscribe(response => {
        if (response) {
          Swal.fire({
            title: "Correcto",
            text: "Cuenta editada correctamente",
            icon: "success",
            showConfirmButton: false
          });
          this.router.navigate(['/home/users', this.idUser]);
        }
      });
    }
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

