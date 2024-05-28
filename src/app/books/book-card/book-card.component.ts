import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent{

  @Input() bookName:string = ""
  @Input() bookAuthor:string = ""
  bookImage:string = ""
  image:File | null | undefined
}
