import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { RequestFriendship } from '../interfaces/RequestFriendship';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  apiUrl:string = "http://localhost:9090/api/v1/requests" //Api para llamar al back
  apiUrl2:string = "http://localhost:9090/api/v1/requestId" //Api 2 para llamar al back, solo se usa en findRequestByUserRequestAndUserReceive



  constructor(private http:HttpClient) { }

  //Obtiene todas las peticiones que le han enviado a un usuario
  findRequests(idUser:number){
    return this.http.get<RequestFriendship[]>(`${this.apiUrl}/${idUser}`)
  }

  //Envía una petición de amistad a un usuario
  addRequest(idSender:number, idReceiver:number){
    return this.http.post<User>(`${this.apiUrl}/${idSender}/${idReceiver}`, null)
  }

  //Elimina la petición de amistad al usuario
  deleteRequest(idSender:number, idReceiver:number){
    return this.http.delete<boolean>(`${this.apiUrl}/${idSender}/${idReceiver}`)
  }

  //Encuentra petición entre usuarios y devuelve el id de la petición
  findRequestByUserRequestAndUserReceive(idSender:number, idReceiver:number){
    return this.http.get<number>(`${this.apiUrl2}/${idSender}/${idReceiver}`)

  }
}
