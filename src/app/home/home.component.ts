import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}
)


export class HomeComponent{

  constructor(private authenticationService: AuthenticationService){}
  
  phoneNumber = '+55123456789'; // Número de telefone desejado
  message = 'Olá, gostaria de iniciar uma conversa!';

  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }

  isAuthenticated(): boolean{
    return this.authenticationService.isAuthenticatedUser();
   }
  }

 


