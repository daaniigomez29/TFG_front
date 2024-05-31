import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/Book';
import { BooksService } from '../../services/books.service';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-all-books-view',
  templateUrl: './all-books-view.component.html',
  styleUrl: './all-books-view.component.css'
})
export class AllBooksViewComponent implements OnInit{

  books:Book[] = []
  p:number = 1

  constructor(private bookService:BooksService, private authService:AuthUserService){}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: data =>{
        this.books = data
      }
    })
  }

}
