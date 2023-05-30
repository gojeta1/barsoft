import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { NotificationService } from 'src/app/notification.service';

interface ApiResponse {
  success: boolean;
  message: string;
  // outras propriedades necessárias
}

@Component({
  selector: 'app-cadastroclientes',
  templateUrl: './cadastroclientes.component.html',
  styleUrls: ['./cadastroclientes.component.scss']
})
export class CadastroclientesComponent implements OnInit{
  cliente = {
    nome: '',
    email: '',
    celular: '',
    rua: '',
    bairro: '',
    numero: '',
    cep: ''
  };

  

  ngOnInit() {
    this.notificationService.notification$.subscribe((message) => {
      this.notification = message;
      this.notification2 = message;
    });
  }

  apiUrl = 'http://localhost:3000/cadclientes'

  notification: any;
  notification2: any;

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  submitForm() {
    this.http.post<ApiResponse>(this.apiUrl, this.cliente)
      .subscribe(
        response => {
          console.log(response);
          this.cliente = {
            nome: '',
            email: '',
            celular: '',
            rua: '',
            bairro: '',
            numero: '',
            cep: ''
          };
          this.notification = 'Cadastro realizado com sucesso.';
          this.notification2 = null;
        },
        error => {
          console.error(error);
          console.log('Erro ao cadastrar cliente');
          if(error.status === 400){
            this.notification2 = 'Por favor, preencha todos os campos obrigatórios.';
            this.notification = null;
          }else{
            this.notification = 'Erro interno do servidor.';
            this.notification2 = null;
          }

        }
      );
  }


}
