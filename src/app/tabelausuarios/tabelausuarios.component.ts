import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../userservice.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-tabelausuarios',
  templateUrl: './tabelausuarios.component.html',
  styleUrls: ['./tabelausuarios.component.scss']
})
export class TabelausuariosComponent implements OnInit{
  apiUrl: string = 'http://localhost:3000/'
  registros: any [] = [];
  registroAtual: any;
  userId: any;
  currentPage = 1; // Página atual
  itemsPerPage = 10; // Quantidade de usuários por página

  constructor (private http: HttpClient, private authenticationService: AuthenticationService,private userService: UserService,private notificationService: NotificationService){}

  ngOnInit(): void {
    this.buscarRegistros();
  }

  buscarRegistros() {
    this.http.get<any[]>(`${this.apiUrl}tabelausuarios`).subscribe((response) => {
      this.registros = response;
  },
    (error) => {
      console.log(error);
    });
  }

  editarRegistro(registro: any) {
    this.registroAtual = registro;
  }
  
  // Método para salvar as alterações do registro
  salvarAlteracoes() {
    this.http.put(`${this.apiUrl},${this.registroAtual.id}`, this.registroAtual).subscribe((response: any) => {
      // Lógica adicional após a atualização do registro
    });
  }
  
  deleteRegistro(userId: number, userNome: string) {
    this.notificationService.confirm(`Tem certeza que deseja excluir o usuário ${userNome}?`, 'Confirmação de exclusão').then((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            console.log('Usuário excluído com sucesso');
            this.buscarRegistros();
          },
          (error) => {
            console.error('Erro ao excluir usuário:', error);
          }
        );
      }
    });
  }
  }

