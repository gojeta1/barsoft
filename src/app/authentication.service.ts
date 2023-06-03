import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000';
  
  isLoggedin = false;
  aguardandoResposta = true;
  carregando = true;
  private isAuthenticated = false;

  
  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }
  

  login(username: string, password: string){
     
     this.http.post<any>(`${this.apiUrl}/login`, {username, password}).subscribe(
      (response) => {
        console.log(response.message);

        // Faça o que for necessário após o login bem-sucedido
        if(response.success === true){

          const token = response.token;
          const userId = response.userId;
          const nomeUser = response.nomeUsuario;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('nomeUser', nomeUser);
          this.router.navigate(['/home'])
          this.isAuthenticated = true;
          return;
          
          }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        this.notificationService.notify(error.error.message);
        // Lide com o erro de login
      }
    );
    
  }

  logout(): void {
    // Lógica de logout
    localStorage.removeItem('token');
    // Realize as ações necessárias para deslogar o usuário, como limpar o token de autenticação, remover informações da sessão, etc.
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  checkAuthentication(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token; // Verifica se o token existe
    
  }

  isAuthenticatedUser(): boolean {
    // Verifique se o usuário está autenticado
    return this.isAuthenticated;
  }

  
}

