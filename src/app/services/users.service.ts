import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string = "http://localhost:9090/api/v1/users"


  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<User[]>(this.apiUrl)
  }

  getUser(idUser:number){
    return this.http.get<User>(`${this.apiUrl}/${idUser}`)
  }

  editUser(idUser:number, user:User){
    return this.http.put<User>(`${this.apiUrl}/${idUser}`, user)
  }

  getFriends(idUser:number){
    return this.http.get<User[]>(`${this.apiUrl}/${idUser}/friends`)
  }
}
