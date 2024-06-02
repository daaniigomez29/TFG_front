import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  apiUrl:string = "http://localhost:9090/api/v1/friends"



  constructor(private http:HttpClient) { }

  addFriend(idSender:number, idReceiver:number){
    return this.http.post<User>(`${this.apiUrl}/${idSender}/${idReceiver}`, null)
  }

  deleteFriend(idSender:number, idReceiver:number){
    return this.http.delete<boolean>(`${this.apiUrl}/${idSender}/${idReceiver}`)
  }
}
