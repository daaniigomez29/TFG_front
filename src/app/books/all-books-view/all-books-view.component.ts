import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../interfaces/Book';
import { BooksService } from '../../services/books.service';
import { AuthUserService } from '../../services/auth-user.service';
import { SearchService } from '../../services/searchService.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-books-view',
  templateUrl: './all-books-view.component.html',
  styleUrl: './all-books-view.component.css'
})
export class AllBooksViewComponent implements OnInit, OnDestroy{

  books:Book[] = []
  booksSearched:Book[] = []
  p:number = 1

  private searchSubscription!: Subscription;

  constructor(private bookService:BooksService, public authService:AuthUserService, public searchService:SearchService, private router:Router){}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: data =>{
        this.books = data
        this.booksSearched = data
        this.searchBook()
      }
    })
  }

  searchBook(){
    this.searchSubscription = this.searchService.currentSearchTerm.subscribe(term => {
      this.booksSearched = this.books.filter(book =>
        book.name.toLowerCase().startsWith(term.toLowerCase())
      );
    });
  }

  addBook(){
    this.router.navigate(['home/books/add'])
  }

  ngOnDestroy(): void {
    if(this.searchSubscription){
      this.searchSubscription.unsubscribe();
    }
  }
}
