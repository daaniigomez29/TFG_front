import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { LoginRequest } from '../interfaces/LoginRequest';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenRequest } from '../interfaces/TokenRequest';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl:string = "http://localhost:9090/api/v1/auth"
  private isAuthenticated$: BehaviorSubject<boolean>;

  constructor(private http:HttpClient, private router:Router) { 
    this.isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  register(registerRequest:RegisterRequest): Observable<any> {
   return this.http.post(this.apiUrl + "/register", registerRequest)
  }

  login(loginRequest:LoginRequest): Observable<any> {
   return this.http.post<TokenRequest>(this.apiUrl + "/login", loginRequest)
    .pipe(
      tap(
        response =>{
          localStorage.setItem('token', response.token)
         console.log(response)
        }),
        catchError(
          error =>{
            return error;
          }
        )
    )
  }

  isLogged(): boolean{
    return localStorage.getItem('token') ? true : false
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  isAuthenticated() : boolean{
    return !!this.getToken();
  }

  getIsAuthenticated() : Observable<boolean>{
  return this.isAuthenticated$.asObservable();
  }

  isAdmin() : boolean{
    return (this.getUserData().admin == true) ? true : false
  }

  getUserData(){
    let token:string = localStorage.getItem('token') as any;
    const {name, admin, nameuser, image, idUser} = jwtDecode(token) as any
    return {
      nombre : name,
      admin : admin,
      nameuser : nameuser,
      image: image,
      id: idUser
    }
  }

  logout(){
    localStorage.removeItem('token'); //eliminame el token del LocalStorage
    this.isAuthenticated$.next(false);                      
    Swal.fire({ // muestra una alert exitosa
      title: "Sesión cerrada",
      icon: "success"
    })
    this.router.navigateByUrl('login'); //Devuelveme al login
  }
}
