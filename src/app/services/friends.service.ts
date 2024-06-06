import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  apiUrl:string = "http://localhost:8080/api/v1/friends" //api para llamar alback



  constructor(private http:HttpClient) { }

  //Añade amigo al usuario
  addFriend(idSender:number, idReceiver:number){
    return this.http.post<User>(`${this.apiUrl}/${idSender}/${idReceiver}`, null)
  }

  //Elimina amigo del usuario
  deleteFriend(idSender:number, idReceiver:number){
    return this.http.delete<boolean>(`${this.apiUrl}/${idSender}/${idReceiver}`)
  }
}
