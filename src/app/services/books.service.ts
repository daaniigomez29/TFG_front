import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

apiUrl:string = "http://localhost:9090/api/v1/books"

  constructor(private http:HttpClient) { }


  getAllBooks(){
    return this.http.get<Book[]>(this.apiUrl)
  }

  getBook(id:number){
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
  }

  editBook(id:number, book:Book){
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book)
  }

  addBook(book:Book){
    return this.http.post<Book>(this.apiUrl, book)
  }

  deleteBook(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
