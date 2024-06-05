import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }
  
    //Valida que el correo no exista
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
      const email = control.value;
      
      return this.http.get<any>(`http://localhost:9090/api/v1/users/existsEmail/${email}`) //Hace llamada a api en la que se comprueba si ese email ya existe
      .pipe(
        map( resp => {
          return (resp == false) ? null : { emailTaken: true} //Si no existe devuelve null, si existe saltará error en el formulario
        }),
        catchError(error => of(null))
  
      )
    }
}
