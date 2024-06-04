import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }
  
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
      const email = control.value;
      
      return this.http.get<any>(`http://localhost:9090/api/v1/users/existsEmail/${email}`)
      .pipe(
        map( resp => {
          return (resp == false) ? null : { emailTaken: true}
        }),
        catchError(error => of(null))
  
      )
    }
}
