import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { AuthenticationService } from '../authentication.service';

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

  constructor (private http: HttpClient, private authenticationService: AuthenticationService){this.userId = this.authenticationService.getUserId()}

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
  
  excluirRegistro(registro: { id: any; }) {
    this.http.delete(`${this.apiUrl},${registro.id}`).subscribe(() => {
      // Lógica adicional após a exclusão do registro
    });
  }
}
