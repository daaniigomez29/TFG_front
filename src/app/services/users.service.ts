import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { TokenRequest } from '../interfaces/TokenRequest';
import { Observable, catchError, tap } from 'rxjs';

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

  editUser(idUser:number, user:User): Observable<any>{
    return this.http.put<TokenRequest>(`${this.apiUrl}/${idUser}`, user).pipe(
      tap(response =>{
        localStorage.removeItem('token')
        localStorage.setItem('token', response.token)
      })
    )
  }

  getFriends(idUser:number){
    return this.http.get<User[]>(`${this.apiUrl}/${idUser}/friends`)
  }
}
