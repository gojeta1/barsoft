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
  userId: number = 0;
  notification: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {}
  
  ngOnInit() {
    this.notificationService.notification$.subscribe((message) => {
      this.notification = message;
      this.aguardandoResposta = false;
      this.carregando = false;
    });
  }

  login() {
    
    this.notification = ''; // Limpar notificação anterior
    this.aguardandoResposta = true;
    this.carregando = true;
    
     this.authenticationService.login(this.username, this.password)

  }


  // Logica do botão de mutar o vídeo da tela de login

  video!: HTMLVideoElement;
  isMuted = false;

  ngAfterViewInit() {
    this.video = document.getElementById('my-video') as HTMLVideoElement;
  }

  muteVideo() {
    this.isMuted = !this.isMuted;
    this.video.muted = this.isMuted;
  }
  
  fecharAlerta(){

  }


}
