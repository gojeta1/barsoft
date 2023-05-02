import { Component } from '@angular/core';
import { __values } from 'tslib';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  
  login(): void {
    
    this.aguardandoResposta = true;
    this.carregando = true;
    this.esconderDiv = true;
    this.esconderDiv2 = true;

    this.authenticationService.login(this.username, this.password)
        console.log('Usuário autenticado com sucesso');
        // Redirecionar para a página home
        this.router.navigateByUrl('/home');
        this.carregando = false;
        this.aguardandoResposta = false;
  
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

  esconderDiv:boolean = true;
  esconderDiv2:boolean = true;
  
  fecharAlerta(){
      this.esconderDiv = false;
      this.esconderDiv2 = false;
  }

}
