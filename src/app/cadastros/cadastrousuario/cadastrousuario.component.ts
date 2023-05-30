import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-cadastrousuario',
  templateUrl: './cadastrousuario.component.html',
  styleUrls: ['./cadastrousuario.component.scss']
})
export class CadastrousuarioComponent {
  usuario = {
    id: '',
    nome: '',
    username: '',
    password: '',
    token: ''
  };

  apiUrl = 'http://localhost:3000/cadusuario'

  notificationSuccess: any;
  notificationError: any;
  confirmarSenha: any;
  password: any;

  constructor (private http: HttpClient, private notificationService: NotificationService, ){
 
  }

  novousuarioForm(){
    if(this.usuario.password != this.confirmarSenha) {
        this.notificationError = 'Senhas não conferem.'
        this.notificationSuccess = null;
      }else{
        this.notificationError = null;

    this.http.post(this.apiUrl, this.usuario).subscribe(response =>{
      this.usuario = {
        id: '',
        nome: '',
        username: '',
        password: '',
        token: ''
      };
      this.notificationSuccess = 'Usuário cadastrado com sucesso.';
    }, error =>{

        if(error.status === 400){
          this.notificationError = 'Por favor preencha todos os campos do formulário.';
          this.notificationSuccess = null;
        }else if(error.status === 401){
          this.notificationError = 'Senhas não conferem.' ;
          this.notificationSuccess = null;
        }else{
          this.notificationError = 'Erro interno no servidor.';
        }
    });
    }
  }
}
