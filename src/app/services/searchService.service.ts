import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>(''); //Cadena de búsqueda para encontrar libros/usuarios
  currentSearchTerm = this.searchTerm.asObservable(); //Hacemos la cadena observable

  constructor() { }

  //Cuando se actualice la cadena, se añade lo nuevo a la antigua cadena
  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}