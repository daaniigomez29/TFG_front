import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { SearchService } from '../../services/searchService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrl: './navbar-view.component.css'
})
export class NavbarViewComponent implements OnInit{

  imageProfile:string = ""

  selectOptionIcon:string = "fa-book"

  optionSearchPlaceholder:string = "Buscar libro"

  constructor(public authService:AuthUserService, private searchService:SearchService, private router:Router){}

  ngOnInit(): void {
    this.imageProfile = this.authService.getUserData().image
  }

  logout(){
    this.authService.logout()
  }

  search(event:any){
    let word = event.target.value
    this.searchService.updateSearchTerm(word)
  }

  updateIconSearch(icon:string, placeholder:string){
    const iconElement = document.getElementById('iconSearch');

    if (iconElement) {  
      // Eliminar la clase anterior del ícono
      iconElement.classList.remove(this.selectOptionIcon);
  
      // Añadir la nueva clase del ícono
      iconElement.classList.add(icon);
    }

    
    this.selectOptionIcon = icon
    this.optionSearchPlaceholder = placeholder
  }

  goToUserView(){
    this.router.navigateByUrl('/home', {skipLocationChange: true}).then(() =>{
      this.router.navigate(["/home/users/", this.authService.getUserData().id])
    })
  }
}
