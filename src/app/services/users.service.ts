import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { TokenRequest } from '../interfaces/TokenRequest';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string = "http://localhost:8080/api/v1/users" //Api para llamar al back
  
  chatsUser: {[key: string]: string} = {};

  constructor(private http:HttpClient) { }

  //Obtiene todos los usuarios
  getAllUsers(){
    return this.http.get<User[]>(this.apiUrl)
  }

  //Obtiene usuario por id
  getUser(idUser:number){
    return this.http.get<User>(`${this.apiUrl}/${idUser}`)
  }

  //Edita usuario actualizando el token
  editUser(idUser:number, user:User): Observable<any>{
    return this.http.put<TokenRequest>(`${this.apiUrl}/${idUser}`, user).pipe(
      tap(response =>{
        localStorage.removeItem('token')
        localStorage.setItem('token', response.token)
      })
    )
  }

  //Obtiene amigos del usuario
  getFriends(idUser:number){
    return this.http.get<User[]>(`${this.apiUrl}/${idUser}/friends`)
  }
}
