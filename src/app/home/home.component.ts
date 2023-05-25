import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}
)


export class HomeComponent implements OnInit{

    nomeUsuario = '';
    

  constructor(private authenticationService: AuthenticationService, private htpp: HttpClient) {}

  ngOnInit() {
    // Substitua pelo id do usuário logado obtido a partir do seu mecanismo de autenticação
     this.authenticationService.getNomeUsuarioLogado(Number(3)).subscribe((data: any) => {
      this.nomeUsuario = data.nome;
    });
  }
  

  }

 


