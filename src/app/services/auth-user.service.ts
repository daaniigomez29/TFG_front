import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { LoginRequest } from '../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  apiUrl:string = "http://localhost:8080/api/v1/auth"

  constructor(private http:HttpClient) { }

  register(registerRequest:RegisterRequest){
    this.http.post(this.apiUrl + "/register", registerRequest)
  }

  login(loginRequest:LoginRequest){
    this.http.post(this.apiUrl + "/login", loginRequest)
  }
}
