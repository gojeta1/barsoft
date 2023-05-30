import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';

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

  notification: string = '';
  notification2: string = '';

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  submitForm() {
    this.http.post(this.apiUrl, this.cliente)
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
          this.notification = 'Cadastrado com sucesso'
        },
        error => {
          console.error(error);
          console.log('Erro ao cadastrar cliente');
          this.notification2 = "Erro ao cadastrar cliente"
        }
      );
  }


}
