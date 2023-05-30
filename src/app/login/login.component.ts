import { Component } from '@angular/core';
import { __values } from 'tslib';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Observable, filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

  aguardandoResposta = false;
  carregando: boolean = false;
  username: string = '' ;
  password: string = '' ;
  isLoggedin = false;
  notification: string = '';
  nomeUsuario = '';

  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {}
  
  ngOnInit() {
    this.notificationService.notification$.subscribe((message) => {
      this.notification = message;
      this.aguardandoResposta = false;
      this.carregando = false;
    });
  }

  login(): void {
    
    this.notification = ''; // Limpar notificação anterior
    this.aguardandoResposta = true;
    this.carregando = true;
    
    this.authenticationService.login(this.username, this.password)
  }

}
