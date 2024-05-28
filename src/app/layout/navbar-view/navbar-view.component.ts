import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrl: './navbar-view.component.css'
})
export class NavbarViewComponent implements OnInit{

  imageProfile:string = ""

  constructor(public authService:AuthUserService){}

  ngOnInit(): void {
    console.log(this.authService.getUserData().id)
    this.imageProfile = this.authService.getUserData().image
  }

  logout(){
    this.authService.logout()
  }
}
