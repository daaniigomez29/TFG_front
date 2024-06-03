import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';
import { FavoriteBook } from '../interfaces/FavoriteBook';

@Injectable({
  providedIn: 'root'
})
export class FavoriteBooksService {

apiUrl:string = "http://localhost:9090/api/v1/favorites"

  constructor(private http:HttpClient) { }


  getAllFavoriteBooks(idUser:number){
    return this.http.get<FavoriteBook[]>(`${this.apiUrl}/${idUser}`)
  }

  addFavoriteBook(idUser:number, idBook:number){
    return this.http.post<Book>(`${this.apiUrl}/${idUser}/${idBook}`, null)
  }


  deleteFavoriteBook(idUser:number, idBook:number){
    return this.http.delete(`${this.apiUrl}/${idUser}/${idBook}`)
  }

  findByUserIdAndBookId(idUser:number, idBook:number){
    return this.http.get<number>(`${this.apiUrl}/${idUser}/${idBook}`)
  }
}