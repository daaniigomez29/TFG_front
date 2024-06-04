import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService implements AsyncValidator {

  constructor(private http:HttpClient) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;

    return this.http.get<any>(`http://localhost:9090/api/v1/users/existsNameuser/${username}`).pipe(
      map(resp =>{
        return (resp == false) ? null : {usernameTaken:true}
      }),
      catchError(err => of(null))
    )
  }


  
}
