import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';
import { FavoriteBook } from '../interfaces/FavoriteBook';

@Injectable({
  providedIn: 'root'
})
export class FavoriteBooksService {

apiUrl:string = "http://localhost:9090/api/v1/favorites" //Url para llamar al back

  constructor(private http:HttpClient) { }

  //Obtiene todos los libros favoritos de un usuario
  getAllFavoriteBooks(idUser:number){
    return this.http.get<FavoriteBook[]>(`${this.apiUrl}/${idUser}`)
  }

  //Añade un libro favorito a un usuario
  addFavoriteBook(idUser:number, idBook:number){
    return this.http.post<Book>(`${this.apiUrl}/${idUser}/${idBook}`, null)
  }

  //Elimina un libro favorito de un usuario
  deleteFavoriteBook(idUser:number, idBook:number){
    return this.http.delete(`${this.apiUrl}/${idUser}/${idBook}`)
  }

  //Devuelve el id de la relación entre el usuario y su libro favorito si existe
  findByUserIdAndBookId(idUser:number, idBook:number){
    return this.http.get<number>(`${this.apiUrl}/${idUser}/${idBook}`)
  }
}