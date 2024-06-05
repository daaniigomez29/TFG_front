import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() userId:number = -1
  @Input() userNameuser:string = ""
  @Input() userName:string = ""
  @Input() userImage:string = ""

  constructor(private router:Router, public authService:AuthUserService){}

  detailsuser(){
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
      this.router.navigate(["/home/users/", this.userId]);
    })
  }
}
