import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}
)


export class HomeComponent{

  phoneNumber = '+55123456789'; // Número de telefone desejado
  message = 'Olá, gostaria de iniciar uma conversa!';

  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }

  }

 


