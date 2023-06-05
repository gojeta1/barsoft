import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { NotificationService } from '../notification.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-tabelaclientes',
  templateUrl: './tabelaclientes.component.html',
  styleUrls: ['./tabelaclientes.component.scss']
})
export class TabelaclientesComponent {

  apiUrl: string = 'http://localhost:3000/'
  registros: any [] = [];
  registroAtual: any;
  userId: any;
  currentPage = 1; // Página atual
  itemsPerPage = 10; // Quantidade de usuários por página

constructor (private http: HttpClient, private authenticationService: AuthenticationService,private notificationService: NotificationService, private clienteService: ClienteService ){}

  ngOnInit(): void {
    this.buscarRegistros();
  }

  buscarRegistros() {
    this.http.get<any[]>(`${this.apiUrl}tabelaclientes`).subscribe((response) => {
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
  
  deleteRegistro(clienteId: number, clienteNome: string) {
    this.notificationService.confirm(`Tem certeza que deseja excluir o cliente ${clienteNome}?`, 'Confirmação de exclusão').then((result) => {
      if (result) {
        this.clienteService.deleteCliente(clienteId).subscribe(
          () => {
            console.log('Cliente excluído com sucesso');
            this.buscarRegistros();
          },
          (error) => {
            console.error('Erro ao excluir Cliente:', error);
          }
        );
      }
    });
  }
}
