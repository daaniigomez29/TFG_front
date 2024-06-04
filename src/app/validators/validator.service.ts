import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private http: HttpClient) { }


    patternEmail(control:AbstractControl){
     const email:string = control.value;
     
     return email.includes("@") && email.endsWith(".com") ? null : {noValidEmail : true}
    }
}
