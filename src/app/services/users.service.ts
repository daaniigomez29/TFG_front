import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string = "http://localhost:8080/api/v1/users"


  constructor(private http:HttpClient) { }

  
}
