import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService implements AsyncValidator {

  constructor(private http:HttpClient, private authService:AuthUserService) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;

    return this.http.get<any>(`http://localhost:9090/api/v1/users/existsNameuser/${this.authService.getUserData().id}/${username}`).pipe(
      map(resp =>{
        return (resp == false) ? null : {usernameTaken:true}
      }),
      catchError(err => of(null))
    )
  }


  
}
