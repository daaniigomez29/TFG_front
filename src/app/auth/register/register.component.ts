import { Component } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerRequest:RegisterRequest = {
    email: "",
    nameuser: "",
    password: "",
    name: "",
    image: "",
    admin: true
  }

  constructor(private authService:AuthUserService, private router:Router){}

  register(){
    const reader = new FileReader();

    reader.onload = () =>{
        this.registerRequest.image = reader.result as string
    }

    this.authService.register(this.registerRequest).subscribe({
      next: response =>{
          Swal.fire({
            title: "Correcto",
            text: "Cuenta creada correctamente",
            icon: "success",
            showConfirmButton: false
          });
          this.router.navigateByUrl("/login")
      },
      error: responseError =>{
        Swal.fire({
          title: "Incorrecto",
          text: "Registro fallido",
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }
}
