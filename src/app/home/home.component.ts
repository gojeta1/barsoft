import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    nomeUsuarioLogado: string ='';

  constructor(private authenticationService: AuthenticationService, private htpp: HttpClient) {}

  ngOnInit(): void {
    this.authenticationService.getNomeUsuarioLogado()
  }

  
  }

 


