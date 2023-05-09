import { Component } from '@angular/core';
import { __values } from 'tslib';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  mensagem: string = '';
  loginForm: any;
  esconderDiv: boolean = true ;
  esconderDiv2: boolean = true;
  error: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  login() {
    
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
      this.esconderDiv = false;
      this.esconderDiv2 = false;
      this.aguardandoResposta = false;
      this.carregando = false;
  }

}
