import { Component } from '@angular/core';
import { __values } from 'tslib';


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


  validarLogin(): void {
    
    this.aguardandoResposta = true;
    this.carregando = true;
    this.esconderDiv = true;
    this.esconderDiv2 = true;

    if (!this.username || !this.password) {
      this.mensagem = 'Por favor, preencha todos os campos.';
      this.carregando = false;
      return;
    }

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
