import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { LoginRequest } from '../interfaces/LoginRequest';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl:string = "http://localhost:8080/api/v1/auth"
  private isAuthenticated$: BehaviorSubject<boolean>;

  constructor(private http:HttpClient) { 
    this.isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  register(registerRequest:RegisterRequest): Observable<any> {
   return this.http.post(this.apiUrl + "/register", registerRequest)
  }

  login(loginRequest:LoginRequest): Observable<any> {
   return this.http.post(this.apiUrl + "/login", loginRequest)
    .pipe(
      tap(
        response =>{
         // localStorage.setItem('token', response.)
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
    return (this.getUserData().admin == 'admin') ? true : false
  }

  getUserData(){
    let token:string = localStorage.getItem('token') as any;
    const {name, admin, username} = jwtDecode(token) as any
    return {
      nombre : name,
      admin : admin,
      username : username
    }
  }
}
