import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

apiUrl:string = "http://localhost:8080/api/v1/books"

  constructor(private http:HttpClient) { }
}
