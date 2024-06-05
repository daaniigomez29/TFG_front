import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

apiUrl:string = "http://localhost:9090/api/v1/books" //Url para llamar al back

  constructor(private http:HttpClient) { }

  //Obtiene todos los libros
  getAllBooks(){
    return this.http.get<Book[]>(this.apiUrl)
  }

  //Obtiene un libro a partir de un id
  getBook(id:number){
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
  }

  //Edita un libro
  editBook(id:number, book:Book){
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book)
  }

  //Añade un libro nuevo
  addBook(book:Book){
    return this.http.post<Book>(this.apiUrl, book)
  }

  //Elimina un libro a partir de un id
  deleteBook(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
