import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent{

  @Input() bookId:number = -1
  @Input() bookName:string = ""
  @Input() bookAuthor:string = ""
  @Input() bookImage:string = ""

  constructor(private router:Router){}

  detailsBook(){
    this.router.navigate(["/home/books/", this.bookId])
  }
}
