import { Component } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { LoginRequest } from '../../interfaces/LoginRequest';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginRequest:LoginRequest = {
    email: "",
    password: ""
  }

  constructor(private authService:AuthUserService, private router:Router){}

  login(){
    this.authService.login(this.loginRequest).subscribe({
      next: response =>{
          Swal.fire({
            title: "Correcto",
            text: "Bienvenido",
            icon: "success",
            showConfirmButton: false
          });
          this.router.navigateByUrl("/home/books")
      },
      error: responseError =>{
        Swal.fire({
          title: "Incorrecto",
          text: "Inicio de sesión fallido",
          icon: "error",
          showConfirmButton: false
        });
      }
    })
  }
}
