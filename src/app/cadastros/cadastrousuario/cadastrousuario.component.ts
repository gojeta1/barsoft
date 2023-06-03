import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { TabelausuariosComponent } from 'src/app/tabelausuarios/tabelausuarios.component';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-cadastrousuario',
  templateUrl: './cadastrousuario.component.html',
  styleUrls: ['./cadastrousuario.component.scss']
})
export class CadastrousuarioComponent {
usuario = {
  id : '',
  nome: '',
  username: '',
  password: '',
  token: '',
}

  apiUrl = 'http://localhost:3000/cadusuario'

  notificationSuccess: any;
  notificationError: any;
  confirmarSenha: any;

  constructor (private http: HttpClient, private notificationService: NotificationService,private tabelaUsuarios: TabelausuariosComponent ){}

  novousuarioForm(){

    this.http.post(this.apiUrl, this.usuario).subscribe(response =>{
      if(this.usuario.password != this.confirmarSenha) {
        this.notificationError = 'Senhas não conferem.'
        this.notificationSuccess = null;
      }else{
        this.notificationError = null;
        this.usuario = {
          id: '',
          nome: '',
          username: '',
          password: '',
          token: ''
        };
        this.notificationSuccess = 'Usuário cadastrado com sucesso.';
        this.tabelaUsuarios.buscarRegistros();
      }
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

    gerarHashSenha(senha: string) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(senha, salt);

  }
  
}
