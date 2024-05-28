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
}
