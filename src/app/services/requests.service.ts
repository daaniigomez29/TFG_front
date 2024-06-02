import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  apiUrl:string = "http://localhost:9090/api/v1/requests"
  apiUrl2:string = "http://localhost:9090/api/v1/requestId"



  constructor(private http:HttpClient) { }

  findRequests(idUser:number){
    return this.http.get<User[]>(`${this.apiUrl}/${idUser}`)
  }

  addRequest(idSender:number, idReceiver:number){
    return this.http.post<User>(`${this.apiUrl}/${idSender}/${idReceiver}`, null)
  }

  deleteRequest(idSender:number, idReceiver:number){
    return this.http.delete<boolean>(`${this.apiUrl}/${idSender}/${idReceiver}`)
  }

  findRequestByUserRequestAndUserReceive(idSender:number, idReceiver:number){
    return this.http.get<number>(`${this.apiUrl2}/${idSender}/${idReceiver}`)

  }
}
